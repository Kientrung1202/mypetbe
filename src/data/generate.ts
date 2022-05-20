import { logErr } from "../services/log";
import { OrderDetails } from "../models/orderDetails";
import { Orders } from "../models/orders";
import { Payment } from "../models/payments";
import { generateProductLine } from "./genProductLines";
import { generateProducts } from "./genProduct";
import genUsers from "./genUser";
import { Cart } from "../models/cart";
import { CartItem } from "../models/cartItem";

const generateDb = async () => {
  try {
    await OrderDetails.sync({ force: true });
    await Orders.sync({ force: true });
    await Payment.sync({ force: true });
    await Cart.sync({ force: true });
    await CartItem.sync({ force: true });
    await generateProductLine();
    await generateProducts();
    await genUsers();
  } catch (err: any) {
    logErr("Error genDb", err.toString());
  }
};
export default generateDb;
