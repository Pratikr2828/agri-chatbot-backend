import { INDICATORS, dimensionColumnMap } from "../utils/config.js";
import db from "../models/index.js"; 
import { Sequelize } from "sequelize";
import { LGD_TO_STATE, LGD_TO_DISTRICT } from "../utils/lgdStateMap.js";

async function executeAnalytics(intent, userLgd) {
    const isComparison = Array.isArray(intent.indicator);

    // =============================
    // 1️⃣ Validate indicators
    // =============================
    if (!intent.indicator || (Array.isArray(intent.indicator) && intent.indicator.length === 0)) {
        throw new Error(`No indicator provided for intent: ${JSON.stringify(intent)}`);
    }

    const indicators = Array.isArray(intent.indicator) ? intent.indicator : [intent.indicator];

    for (const key of indicators) {
        if (!INDICATORS[key]) {
            throw new Error(`Indicator not found in mapping: ${key}`);
        }
    }

    // =============================
    // 2️⃣ Build WHERE clause
    // =============================
    const whereClause = {};

    if (userLgd) {
        if (Array.isArray(userLgd)) {
            const stateCodes = [], districtCodes = [], villageCodes = [];
            for (const geo of userLgd) {
                if (geo.village_lgd_code) villageCodes.push(String(geo.village_lgd_code));
                else if (geo.district_lgd_code) districtCodes.push(String(geo.district_lgd_code));
                else if (geo.state_lgd_code) stateCodes.push(String(geo.state_lgd_code));
            }
            if (villageCodes.length > 0) whereClause.village_lgd_code = { [Sequelize.Op.in]: villageCodes };
            else if (districtCodes.length > 0) whereClause.district_lgd_code = { [Sequelize.Op.in]: districtCodes };
            else if (stateCodes.length > 0) whereClause.state_lgd_code = { [Sequelize.Op.in]: stateCodes };
        } else {
            if (userLgd.village_lgd_code) whereClause.village_lgd_code = String(userLgd.village_lgd_code);
            else if (userLgd.district_lgd_code) whereClause.district_lgd_code = String(userLgd.district_lgd_code);
            else if (userLgd.state_lgd_code) whereClause.state_lgd_code = String(userLgd.state_lgd_code);
        }
    }

    const andConditions = [];

    if (intent.filter?.crop) {
        const crops = Array.isArray(intent.filter.crop) ? intent.filter.crop : [intent.filter.crop];
        andConditions.push({
            [Sequelize.Op.or]: crops.map(crop => ({
                crop_name_eng: { [Sequelize.Op.iLike]: `%${crop}%` }
            }))
        });
    }

    if (intent.filter?.season) {
        const seasons = Array.isArray(intent.filter.season) ? intent.filter.season : [intent.filter.season];
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

    // =============================
    // 3️⃣ Comparison Mode
    // =============================
    if (isComparison) {
        if (intent.dimension) {
            const groupColumn = dimensionColumnMap[intent.dimension];
            if (!groupColumn) throw new Error(`Unsupported dimension: ${intent.dimension}`);

            const attributes = [groupColumn];
            for (const key of indicators) {
                const meta = INDICATORS[key];
                attributes.push([Sequelize.fn("SUM", Sequelize.cast(Sequelize.col(meta.column), "DOUBLE PRECISION")), key]);
            }

            const model = db[INDICATORS[indicators[0]].table];
            if (!model) throw new Error(`Database model not found for table: ${INDICATORS[indicators[0]].table}`);

            const rows = await model.findAll({ attributes, where: whereClause, group: [groupColumn], raw: true });

            return {
                title: "Comparison",
                chart_type: "multi_bar",
                labels: rows.map(r => {
                    if (groupColumn === "state_lgd_code") {
                        const state = LGD_TO_STATE[r[groupColumn]];
                        return state ? state.state_name : r[groupColumn] || "Unknown";
                    }
                    return r[groupColumn];
                }),
                values: rows.map(r => indicators.map(key => Number(r[key] || 0))),
                indicators: indicators.map(key => INDICATORS[key].title),
                unit: INDICATORS[indicators[0]].unit || "",
                data_query: "Grouped comparison"
            };
        }

        // Simple comparison (no grouping)
        const results = [];
        for (const key of indicators) {
            const meta = INDICATORS[key];
            const model = db[meta.table];
            if (!model) throw new Error(`Database model not found for table: ${meta.table}`);

            const result = await model.findOne({
                attributes: [[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col(meta.column), "DOUBLE PRECISION")), "total"]],
                where: whereClause,
                raw: true
            });

            results.push({ label: meta.title, value: Number(result?.total || 0), unit: meta.unit || "" });
        }

        return {
            title: "Comparison",
            chart_type: "bar",
            labels: results.map(r => r.label),
            values: results.map(r => r.value),
            unit: results[0]?.unit || "",
            data_query: "Comparison of indicators"
        };
    }

    // =============================
    // 4️⃣ Single Indicator Mode
    // =============================
    const indicatorMeta = INDICATORS[indicators[0]];
    const model = db[indicatorMeta.table];
    if (!model) throw new Error(`Database model not found for table: ${indicatorMeta.table}`);
    const valueField = indicatorMeta.column;

    if (intent.dimension) {
        const groupColumn = dimensionColumnMap[intent.dimension];
        if (!groupColumn) throw new Error(`Unsupported dimension: ${intent.dimension}`);

        const rows = await model.findAll({
            attributes: [
                groupColumn,
                [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col(valueField), "DOUBLE PRECISION")), "total"]
            ],
            where: whereClause,
            group: [groupColumn],
            order: [[Sequelize.literal('"total"'), intent.sorting_type || "DESC"]],
            limit: intent.top_n || null,
            raw: true
        });

        return formatGroupedResponse(rows, groupColumn, indicatorMeta, intent);
    }

    // Summary KPI
    const result = await model.findOne({
        attributes: [[Sequelize.fn("SUM", Sequelize.cast(Sequelize.col(valueField), "DOUBLE PRECISION")), "total"]],
        where: whereClause,
        raw: true
    });

    const total = Number(result?.total || 0);

    return {
        title: indicatorMeta.title,
        chart_type: "kpi",
        labels: ["Total"],
        values: [Number(total.toFixed(4))],
        unit: indicatorMeta.unit || "",
        data_query: `SUM(${valueField})`
    };
}


/* ======================================
   SUMMARY RESULT (KPI)
====================================== */

/* ======================================
   GROUPED RESULT (BAR / PIE)
====================================== */

function determineChartType({ intent, dataLength }) {

    // 1️⃣ No dimension → KPI
    if (!intent.dimension) return "kpi";

    // 2️⃣ If only one record → KPI
    if (dataLength === 1) return "pie";

    // 3️⃣ Time series → Line chart
    if (intent.dimension === "year") return "line";

    // 4️⃣ Crop distribution
    if (intent.dimension === "crop") {
        if (dataLength <= 6) return "pie";
        return "bar";
    }

    // 5️⃣ District comparison
    if (intent.dimension === "district") {
        if (dataLength > 15) return "bar";
        return "bar";
    }

    // 6️⃣ Default fallback
    return "bar";
}

function formatGroupedResponse(rows, groupColumn, indicatorMeta, intent) {
    console.log("here is the data the we need to filter out.", groupColumn, rows);
    const labels = rows.map(r => {
        if (groupColumn == "state_lgd_code") {
            const state = LGD_TO_STATE[r[groupColumn]];
            return state ? state.state_name : r[groupColumn] || "Unknown";
        } else if (groupColumn == "district_lgd_code") {
            const district = LGD_TO_DISTRICT[r[groupColumn]]
            return district ? district : r[groupColumn] || "Unknown";
        } else {
            return r[groupColumn] || "Unknown";
        }
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
        data_query: `GROUP BY ${groupColumn} → SUM(${indicatorMeta.column})`
    };
}

export default executeAnalytics ;