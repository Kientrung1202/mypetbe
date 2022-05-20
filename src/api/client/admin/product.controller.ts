import express, { Request, Response } from "express";
import { authJwt } from "../../middleware/authJwt";
import { addProduct, deleteProduct } from "./product.service";

const router = express.Router();

router.delete(
  "/admin/product",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    deleteProduct(req, res);
  }
);
router.post(
  "/admin/product",
  authJwt.isAdmin,
  (req: Request, res: Response) => {
    addProduct(req, res);
  }
);

module.exports = router;
