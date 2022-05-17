import Sequelize from "sequelize";
import { db } from "../db";

export const Products = db.sequelize.define(
  "products",
  {
    productCode: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    productName: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    productLine: {
      type: Sequelize.STRING(20),
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
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    sellPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
    timestamps: false,
  }
);
