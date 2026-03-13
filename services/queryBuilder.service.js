import db from "../models/index.js";
import { Sequelize } from "sequelize";
import { INDICATORS } from "../utils/config.js";

export async function runIndicatorQuery(intent, whereClause) {

  const indicatorMeta = INDICATORS[intent.indicator];

  const model = db[indicatorMeta.table];

  const column = indicatorMeta.column;

  const attributes = [
    [Sequelize.fn("SUM", Sequelize.col(column)), "total"]
  ];

  return model.findOne({
    attributes,
    where: whereClause,
    raw: true
  });
}