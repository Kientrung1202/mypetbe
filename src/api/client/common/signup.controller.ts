import { Request, Response } from "express";
import "dotenv/config";
import { createUser, signIn } from "./signup.service";
import { success } from "../../../utils/response";
import CommonError from "./error";
import { authenticate } from "../../middleware/authenticate";
import express from "express";
const router = express.Router();

router.post(
  "/signup",
  [authenticate.checkSignup],
  (req: Request, res: Response) => {
    createUser(req)
      .then(() => {
        return res.json(success("Signup successfully!"));
      })
      .catch((err: Error) => {
        return CommonError(req, res, err);
      });
  }
);
router.post("/signin", (req: Request, res: Response) => {
  signIn(req, res);
});

module.exports = router; // export all router
