import { Request, Response } from "express";
import { OrderDetails } from "../../../models/orderDetails";
import { Orders } from "../../../models/orders";
import { Products } from "../../../models/products";
import Users from "../../../models/user";
import { badRequest, success } from "../../../utils/response";

export const getAllOrder = async (req: Request, res: Response) => {
  const orders = await Orders.findAll({ order: [["orderDate", "DESC"]] });
  const results: any[] = [];
  Promise.all(
    orders.map(async (order) => {
      const userId = order.getDataValue("userId");
      await Users.findByPk(userId).then((user) => {
        const fullName = user?.getDataValue("fullName");
        const phone = user?.getDataValue("phone");
        const address = user?.getDataValue("address");
        const item = {
          fullName,
          phone,
          address,
          orderDate: order.getDataValue("orderDate"),
          shippedDate: order.getDataValue("shippedDate"),
          status: order.getDataValue("status"),
          orderCode: order.getDataValue("orderCode"),
        };
        results.push(item);
      });
    })
  )
    .then(() => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};

export const getDetailOrder = async (req: Request, res: Response) => {
  const orderCode = req.params.orderCode;
  const products: any[] = [];
  const order = await Orders.findByPk(orderCode);
  const userId = order?.getDataValue("userId");
  const status = order?.getDataValue("status");
  const user = await Users.findByPk(userId);
  const orderDetails = await OrderDetails.findAll({ where: { orderCode } });
  let amount = 0;
  const userInfo = {
    name: user?.getDataValue("fullName"),
    phone: user?.getDataValue("phone"),
    address: user?.getDataValue("address"),
  };
  let results = {
    status,
    amount,
    products,
    userInfo,
  };
  await Promise.all(
    orderDetails.map(async (detail) => {
      const productCode = detail.getDataValue("productCode");
      await Products.findByPk(productCode).then((data) => {
        const quantityOrder = detail.getDataValue("quantityOrdered");
        console.log({ quantityOrder });
        const productName = data?.getDataValue("productName");
        const sellPrice = data?.getDataValue("sellPrice");
        const amountItem = quantityOrder * sellPrice;
        amount += amountItem;
        const item = {
          quantityOrder,
          productName,
          sellPrice,
        };
        products.push(item);
        results = {
          status,
          userInfo,
          amount,
          products,
        };
      });
    })
  )
    .then(() => res.json(success(results)))
    .catch((err) => res.json(badRequest(err)));
};

export const updateOrder = async (req: Request, res: Response) => {
  const { status, orderCode } = req.body;
  await Orders.update({ status }, { where: { orderCode } })
    .then(() => res.json("Update successfully"))
    .catch((err) => res.json(err));
};
