import { Request, Response } from "express";
import { Products } from "../../../models/products";
import { badRequest, success } from "../../../utils/response";

export const deleteProduct = async (req: Request, res: Response) => {
  const { productCode } = req.body;
  if (!productCode) return res.json(badRequest("You must be fill productCode"));
  await Products.destroy({ where: { productCode } })
    .then(() => res.json(success("Delete product successfully!")))
    .catch((err) => res.json(badRequest(err)));
};

export const addProduct = async (req: Request, res: Response) => {
  const {
    productCode,
    productName,
    productLine,
    quantityInStock,
    textDescription,
    buyPrice,
    sellPrice,
    image,
  } = req.body;
  await Products.findAll({ where: { productCode } }).then((result) => {
    if (result.length > 0) return res.json(badRequest("Already product code"));
  });
  await Products.findAll({ where: { productName } }).then((result) => {
    if (result.length > 0) return res.json(badRequest("Already product name"));
  });
  await Products.create({
    productCode,
    productLine,
    productName,
    quantityInStock,
    textDescription,
    sellPrice,
    buyPrice,
    image,
  })
    .then(() => res.json(success("Add product successfully!")))
    .catch((err) => res.json(badRequest(err)));
};
