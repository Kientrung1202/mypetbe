import express, { Request, Response } from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  addToCart,
  createOrder,
  deleteAllInCart,
  deleteToCart,
  getAllProduct,
  getDetailProduct,
  getListProduct,
  getListProductLine,
  getProOfCart,
} from "./home.service";
const router = express.Router();

router.get("/listProduct/:productline", (req: Request, res: Response) => {
  getListProduct(req, res);
});
router.get("/allProduct", (req: Request, res: Response) => {
  getAllProduct(req, res);
});
router.get("/listProductline", (req: Request, res: Response) => {
  getListProductLine(req, res);
});

router.post("/order", authJwt.isUser, (req: Request, res: Response) => {
  createOrder(req, res);
});

router.get("/detailProduct/:code", (req: Request, res: Response) => {
  getDetailProduct(req, res);
});

router.get("/cart", authJwt.isUser, (req: Request, res: Response) => {
  getProOfCart(req, res);
});

router.post("/cart", authJwt.isUser, (req: Request, res: Response) =>
  addToCart(req, res)
);
router.delete("/cart", authJwt.isUser, (req: Request, res: Response) =>
  deleteToCart(req, res)
);
router.delete("/allCart", authJwt.isUser, (req: Request, res: Response) =>
  deleteAllInCart(req, res)
);
module.exports = router;
