import express, { Request, Response } from "express";
import { authJwt } from "../../middleware/authJwt";
import {
  createOrder,
  getAllProduct,
  getListProduct,
  getListProductLine,
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

module.exports = router;
