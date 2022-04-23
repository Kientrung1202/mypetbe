import Sequelize from "sequelize";
import { db } from "../db";
import { STATUSORDER } from "../utils/interface";

export const Orders = db.sequelize.define("orders", {
  orderCode: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  shippedDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: STATUSORDER.PREPARE,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});
