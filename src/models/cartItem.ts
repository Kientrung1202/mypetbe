import Sequelize from "sequelize";
import { db } from "../db";

export const CartItem = db.sequelize.define("cartitems", {
  cartId: {
    type: Sequelize.UUID,
  },
  productCode: {
    type: Sequelize.STRING(30),
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});
