import Sequelize from "sequelize";
import { db } from "../db";

export const Cart = db.sequelize.define("carts", {
  cartId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    unique: true,
  },
});
