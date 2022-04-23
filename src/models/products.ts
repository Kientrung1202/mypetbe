import Sequelize from "sequelize";
import { db } from "../db";

export const Products = db.sequelize.define("products", {
  productCode: {
    type: Sequelize.STRING(30),
    primaryKey: true,
  },
  productName: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  productLine: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  quantityInStock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  textDescription: {
    type: Sequelize.TEXT,
    defaultValue: "No description for this",
  },
  buyPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sellPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
