import { Request, Response } from "express";
import { OrderDetails } from "../../../models/orderDetails";
import { Orders } from "../../../models/orders";
import { ProductLines } from "../../../models/productLines";
import { Products } from "../../../models/products";
import { badRequest, success } from "../../../utils/response";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "../../../models/cart";
import { where } from "sequelize/types";
import { CartItem } from "../../../models/cartItem";

export const getListProductLine = async (req: Request, res: Response) => {
  const productLine = await ProductLines.findAll();
  return res.json(success(productLine));
};

export const getListProduct = async (req: Request, res: Response) => {
  const productLine = req.params.productline;
  if (!productLine) return res.json(badRequest("Missing params: productline"));
  const productLineRes = await ProductLines.findByPk(productLine);
  const data: {
    productLine: string;
    productLineName: string;
    product: any[];
  }[] = [];
  // productLines.map(async (productLineRes) => {
  const products = await Products.findAll({
    attributes: [
      "productCode",
      "productName",
      "quantityInStock",
      "textDescription",
      "sellPrice",
      "image",
    ],
    where: {
      productLine,
    },
  });
  const pro: any[] = [];
  products.map((item) => {
    const data = {
      productCode: item.getDataValue("productCode"),
      productName: item.getDataValue("productName"),
      quantityInStock: item.getDataValue("quantityInStock"),
      textDescription: item.getDataValue("textDescription"),
      sellPrice: item.getDataValue("sellPrice"),
      image: item.getDataValue("image"),
    };
    pro.push(data);
  });
  const item = {
    productLine: productLine,
    productLineName: productLineRes?.getDataValue("productLineName"),
    product: pro,
  };
  data.push(item);
  return res.json(success(data));
};

export const getAllProduct = async (req: Request, res: Response) => {
  Products.findAll().then((data) => res.json(success(data)));
};

export const getDetailProduct = async (req: Request, res: Response) => {
  const productCode = req.params.code;
  Products.findByPk(productCode)
    .then((product) => res.json(success(product)))
    .catch((err) => res.json(err));
};

export const createOrder = async (req: Request, res: Response) => {
  const now = new Date();
  const userId = req.body.user.userId;
  const products: {
    productCode: string;
    quantityOrdered: number;
  }[] = req.body.products;
  const orderDate =
    now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay();
  const orderCode = uuidv4();
  try {
    await Orders.create({
      orderCode,
      userId,
      orderDate,
    });
    products.map(async (product) => {
      const { productCode, quantityOrdered } = product;
      await OrderDetails.create({
        orderCode,
        productCode,
        quantityOrdered,
      });
    });

    return res.json(success("add order ok"));
  } catch (err: any) {
    return res.json(badRequest(err.toString()));
  }
};

export const getProOfCart = async (req: Request, res: Response) => {
  const userId = req.body.user.userId;
  const cart = await Cart.findAll({ where: { userId } });
  if (cart.length == 0) return res.json(badRequest("Your cart is Empty"));
  const cartId = cart[0].getDataValue("cartId");
  await CartItem.findAll({
    attributes: [
      "productCode",
      "quantity",
      "image",
      "productName",
      "sellPrice",
    ],
    where: { cartId },
  }).then((result) => res.json(success(result)));
};

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.body.user.userId;
  const { productCode, quantity } = req.body;
  console.log({ userId });
  await Cart.findAll({ where: { userId } }).then(async (cart) => {
    if (cart.length == 0) await Cart.create({ userId });
  });
  const cart = await Cart.findAll({ where: { userId } });
  const cartId = cart[0]?.getDataValue("cartId");
  await CartItem.create({ cartId, productCode, quantity })
    .then(() => res.json(success("Add to cart successfully!")))
    .catch((err) => res.json(badRequest(err)));
};

export const deleteToCart = async (req: Request, res: Response) => {
  const userId = req.body.user.userId;
  const { productCode } = req.body;
  const cart = await Cart.findAll({ where: { userId } });
  const cartId = cart[0]?.getDataValue("cartId");
  await CartItem.destroy({ where: { cartId, productCode } })
    .then(() => res.json(success("Delete from cart successfully!")))
    .catch((err) => res.json(badRequest(err)));
};
