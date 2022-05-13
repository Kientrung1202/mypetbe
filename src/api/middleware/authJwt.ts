import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Users from "../../models/user";
import { ROLE } from "../../utils/interface";
import CommonError from "../client/common/error";

const verifyToken = (req: Request) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new Error("No token provided!");
  }
  jwt.verify(token, process.env.SECRET_KEY_JWT || "", (err, decoded) => {
    console.log(process.env.SECRET_KEY_JWT);
    if (err) throw new Error(err.toString());
    else req.body.user = decoded;
  });
};
const isUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req);
    console.log(req.body.user.userId, "userID day");
    const admin = await Users.findByPk(req.body.user.userId);
    const role = admin?.getDataValue("role");
    if (role && role == ROLE.customer) {
      next();
      return;
    }
    throw Error("You must be authorization!");
  } catch (err: any) {
    return CommonError(req, res, err);
  }
};
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req);
    console.log(req.body.user.userId, "userID day");
    const admin = await Users.findByPk(req.body.user.userId);
    const role = admin?.getDataValue("role");
    if (role && role == ROLE.customer) {
      next();
      return;
    }
    throw Error("You must be authorization!");
  } catch (err: any) {
    return CommonError(req, res, err);
  }
};

export const authJwt = {
  isUser,
  isAdmin,
};
