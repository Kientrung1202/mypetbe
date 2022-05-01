import Sequelize from "sequelize";
import { db } from "../db";

export const ProductLines = db.sequelize.define("productlines", {
  productLine: {
    type: Sequelize.STRING(20),
    primaryKey: true,
  },
  productLineName: {
    type: Sequelize.STRING(35),
    allowNull: false,
  },
  textDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
