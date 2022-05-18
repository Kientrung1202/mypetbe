import { Request, Response } from "express";
import { OrderDetails } from "../../../models/orderDetails";
import { Orders } from "../../../models/orders";
import { ProductLines } from "../../../models/productLines";
import { Products } from "../../../models/products";
import { badRequest, success } from "../../../utils/response";
import { v4 as uuidv4 } from "uuid";

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
  // console.log({ data });
  // });
  return res.json(success(data));
};

export const getAllProduct = async (req: Request, res: Response) => {
  Products.findAll().then((data) => res.json(success(data)));
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

// export const getOrderDetail = async (req: Request, res: Response) => {

// }
