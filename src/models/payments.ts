import Sequelize from "sequelize";
import { db } from "../db";

export const Payment = db.sequelize.define(
  "payments",
  {
    transactionCode: {
      type: Sequelize.STRING(36),
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
    timestamps: false,
  }
);
