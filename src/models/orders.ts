import Sequelize from "sequelize";
import { db } from "../db";
import { STATUSORDER } from "../utils/interface";

export const Orders = db.sequelize.define("orders", {
  orderCode: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  orderDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  shippedDate: {
    type: Sequelize.DATEONLY,
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
