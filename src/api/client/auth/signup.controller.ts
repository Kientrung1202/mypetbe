import { Request, Response } from "express";
import "dotenv/config";
import { createUser } from "./signup.service";
import { success } from "../../../utils/response";
import CommonError from "../common/error";

import express from "express";
const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  createUser(req)
    .then(() => {
      res.json(success("Signup successfully!"));
    })
    .catch((err: Error) => {
      return CommonError(req, res, err);
    });
});

module.exports = router; // export all router
