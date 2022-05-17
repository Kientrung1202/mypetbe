import Sequelize from "sequelize";
import { db } from "../db";

export const OrderDetails = db.sequelize.define("orderdetails", {
  orderCode: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  productCode: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  quantityOrdered: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
