import { logErr } from "../services/log";
import { OrderDetails } from "../models/orderDetails";
import { Orders } from "../models/orders";
import { Payment } from "../models/payments";
import Users from "../models/user";
import { generateProductLine } from "./genProductLines";
import { generateProducts } from "./genProduct";

const generateDb = async () => {
  try {
    await Users.sync({ force: true });
    await OrderDetails.sync({ force: true });
    await Orders.sync({ force: true });
    await Payment.sync({ force: true });
    await generateProductLine();
    await generateProducts();
  } catch (err) {
    logErr("Error", "Gen DB");
  }
};
export default generateDb;
