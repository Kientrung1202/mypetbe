import express, { Request, Response } from "express";
import { authJwt } from "../../middleware/authJwt";
import { getAllOrder, getDetailOrder, updateOrder } from "./order.service";
const router = express.Router();

router.get("/admin/orders", authJwt.isAdmin, (req: Request, res: Response) => {
  // call getOrder;
  getAllOrder(req, res);
});

router.get(
  "/admin/order/:orderCode",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    // detail order
    getDetailOrder(req, res);
  }
);

router.put(
  "/admin/order/:orderCode",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    // call update status and date shipped;
    updateOrder(req, res);
  }
);

module.exports = router;
