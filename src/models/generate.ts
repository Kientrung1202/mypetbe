import { logErr } from "../services/log";
import { OrderDetails } from "./orderDetails";
import { Orders } from "./orders";
import { Payment } from "./payments";
import { ProductLines } from "./productLines";
import { Products } from "./products";
import Users from "./user";

const generateDb = async () => {
  try {
    await Users.sync({ force: true });
    await ProductLines.sync({ force: true });
    await Products.sync({ force: true });
    await OrderDetails.sync({ force: true });
    await Orders.sync({ force: true });
    await Payment.sync({ force: true });
  } catch (err) {
    logErr("error gendb", "loiii");
  }
};
export default generateDb;
