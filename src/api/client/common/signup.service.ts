import Users from "../../../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { badRequest, success } from "../../../utils/response";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (req: Request) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userId, userName, fullName, phone, address } = req.body;
  return Users.create({
    userId,
    userName,
    password: hash,
    fullName,
    phone,
    address,
    createdAt: new Date(),
    lastLogin: new Date(),
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const userInfo = await Users.findOne({
    where: { userName },
  });
  if (!userInfo) {
    res.json(badRequest("Username or password is incorrect!"));
  } else {
    bcrypt.compare(
      password,
      userInfo.getDataValue("password"),
      (err, result) => {
        if (err) res.json(badRequest("Password is incorrect!"));
        if (result) {
          const token = jwt.sign(
            {
              userName,
              userId: userInfo.getDataValue("userId"),
            },
            process.env.SECRET_KEY_JWT || "mypet",
            {
              expiresIn: "7d", // if this is number, this is second
            }
          );
          Users.update(
            { lastLogin: new Date() },
            { where: { userId: userInfo.getDataValue("userId") } }
          )
            .then(() => {
              res.json(
                success({
                  token,
                  userName: userInfo.getDataValue("userName"),
                })
              );
            })
            .catch((err) => {
              res.json(badRequest(err));
            });
        }
      }
    );
  }
};
