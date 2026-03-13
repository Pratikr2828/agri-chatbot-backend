import { INDICATORS, dimensionColumnMap } from "../utils/config.js";
import db from "../models/index.js";
import { Sequelize } from "sequelize";
import { LGD_TO_STATE, LGD_TO_DISTRICT } from "../utils/lgdStateMap.js";
import { runIndicatorQuery } from "./queryBuilder.service.js";
import { redisClient } from "./cache.service.js";

/* ======================================
   MAIN ANALYTICS ENGINE
====================================== */

async function executeAnalytics(intent, userLgd) {

  const isComparison = Array.isArray(intent.indicator);

  const cacheKey = `analytics:${JSON.stringify(intent)}:${JSON.stringify(userLgd)}`;

  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log("⚡ Cache hit");
    return JSON.parse(cached);
  }

  console.log("📊 Cache miss → running DB query");

  if (!intent.indicator || (Array.isArray(intent.indicator) && intent.indicator.length === 0)) {
    throw new Error(`No indicator provided`);
  }

  const indicators = Array.isArray(intent.indicator)
    ? intent.indicator
    : [intent.indicator];

  for (const key of indicators) {
    if (!INDICATORS[key]) {
      throw new Error(`Indicator not found: ${key}`);
    }
  }

  /* ======================================
     BUILD WHERE CLAUSE
  ====================================== */

  const whereClause = {};

  if (userLgd && Array.isArray(userLgd)) {

    const stateCodes = [];
    const districtCodes = [];
    const villageCodes = [];

    for (const geo of userLgd) {

      if (geo.village_lgd_code)
        villageCodes.push(String(geo.village_lgd_code));

      else if (geo.district_lgd_code)
        districtCodes.push(String(geo.district_lgd_code));

      else if (geo.state_lgd_code)
        stateCodes.push(String(geo.state_lgd_code));

    }

    if (villageCodes.length)
      whereClause.village_lgd_code = { [Sequelize.Op.in]: villageCodes };

    else if (districtCodes.length)
      whereClause.district_lgd_code = { [Sequelize.Op.in]: districtCodes };

    else if (stateCodes.length)
      whereClause.state_lgd_code = { [Sequelize.Op.in]: stateCodes };

  }

  const andConditions = [];

  if (intent.filter?.crop) {

    const crops = Array.isArray(intent.filter.crop)
      ? intent.filter.crop
      : [intent.filter.crop];

    andConditions.push({
      [Sequelize.Op.or]: crops.map(crop => ({
        crop_name_eng: { [Sequelize.Op.iLike]: `%${crop}%` }
      }))
    });

  }

  if (intent.filter?.season) {

    const seasons = Array.isArray(intent.filter.season)
      ? intent.filter.season
      : [intent.filter.season];

    andConditions.push({
      [Sequelize.Op.or]: seasons.map(season => ({
        season: { [Sequelize.Op.iLike]: `%${season}%` }
      }))
    });

  }

  if (intent.filter?.year) {
    whereClause.year = String(intent.filter.year);
  }

  if (andConditions.length > 0) {
    whereClause[Sequelize.Op.and] = andConditions;
  }

  /* ======================================
     COMPARISON MODE
  ====================================== */

  if (isComparison) {

    const results = [];

    for (const key of indicators) {

      const result = await runIndicatorQuery(key, whereClause);

      results.push({
        label: INDICATORS[key].title,
        value: Number(result?.total || 0),
        unit: INDICATORS[key].unit || ""
      });

    }

    const response = {
      title: "Comparison",
      chart_type: "bar",
      labels: results.map(r => r.label),
      values: results.map(r => r.value),
      unit: results[0]?.unit || "",
      data_query: "Comparison query"
    };

    await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });

    return response;
  }

  /* ======================================
     SINGLE INDICATOR MODE
  ====================================== */

  const indicatorMeta = INDICATORS[indicators[0]];
  const model = db[indicatorMeta.table];

  if (!model)
    throw new Error(`Database model not found: ${indicatorMeta.table}`);

  const valueField = indicatorMeta.column;

  /* ======================================
     GROUPED QUERY
  ====================================== */

  if (intent.dimension) {

    const groupColumn = dimensionColumnMap[intent.dimension];

    if (!groupColumn) {
      console.log("⚠️ Unsupported dimension → fallback to KPI");
    } else {

      // 🔥 VALIDATE COLUMN EXISTS IN TABLE
      const tableColumns = Object.keys(model.rawAttributes);

      if (tableColumns.includes(groupColumn)) {

        const rows = await model.findAll({

          attributes: [
            groupColumn,
            [
              Sequelize.fn(
                "SUM",
                Sequelize.cast(
                  Sequelize.col(valueField),
                  "DOUBLE PRECISION"
                )
              ),
              "total"
            ]
          ],

          where: whereClause,
          group: [groupColumn],
          order: [[Sequelize.literal('"total"'), intent.sorting_type || "DESC"]],
          limit: intent.top_n || null,
          raw: true

        });

        const response = formatGroupedResponse(rows, groupColumn, indicatorMeta, intent);

        await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });

        return response;
      }

      console.log(`⚠️ Column ${groupColumn} not in table ${indicatorMeta.table} → fallback KPI`);
    }
  }

  /* ======================================
     KPI QUERY
  ====================================== */

  const result = await runIndicatorQuery(intent.indicator, whereClause);

  const total = Number(result?.total || 0);

  const response = {
    title: indicatorMeta.title,
    chart_type: "kpi",
    labels: ["Total"],
    values: [Number(total.toFixed(4))],
    unit: indicatorMeta.unit || "",
    data_query: `SUM(${valueField})`
  };

  await redisClient.set(cacheKey, JSON.stringify(response), { EX: 3600 });

  return response;
}

/* ======================================
   CHART TYPE DETECTION
====================================== */

function determineChartType({ intent, dataLength }) {

  if (!intent.dimension) return "kpi";

  if (dataLength === 1) return "pie";

  if (intent.dimension === "year") return "line";

  if (intent.dimension === "crop")
    return dataLength <= 6 ? "pie" : "bar";

  return "bar";
}

/* ======================================
   FORMAT GROUPED RESPONSE
====================================== */

function formatGroupedResponse(rows, groupColumn, indicatorMeta, intent) {

  const labels = rows.map(r => {

    if (groupColumn === "state_lgd_code") {

      const state = LGD_TO_STATE[r[groupColumn]];
      return state ? state.state_name : r[groupColumn] || "Unknown";

    }

    if (groupColumn === "district_lgd_code") {

      const district = LGD_TO_DISTRICT[r[groupColumn]];
      return district || r[groupColumn] || "Unknown";

    }

    return r[groupColumn] || "Unknown";
  });

  const values = rows.map(r => Number(r.total || 0));

  const total = values.reduce((a, b) => a + b, 0);

  const percentages = total
    ? values.map(v => Number(((v / total) * 100).toFixed(2)))
    : [];

  return {
    title: `${indicatorMeta.title} by ${intent.dimension}`,
    chart_type: determineChartType({ intent, dataLength: rows.length }),
    labels,
    values,
    percentages,
    unit: indicatorMeta.unit || "",
    record_count: rows.length,
    data_query: `GROUP BY ${groupColumn}`
  };
}

export default executeAnalytics;