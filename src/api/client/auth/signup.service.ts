import User from "../../../models/user";
import { Request } from "express";
import { UUIDV4 } from "sequelize";
import { findUserByUserName } from "../common/user";
import bcrypt from "bcrypt";
import { convertDate } from "../common/toDateTime";

export const createUser = (req: Request) => {
  const body = JSON.parse(req.body.curl);
  return findUserByUserName(body.userName).then((result) => {
    if (result) {
      throw Error("Username has already in use!");
    } else {
      bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) throw Error("Can't hash password");
        else {
          const { userName, fullName, phone, address } = body;
          User.create({
            userId: UUIDV4(),
            userName,
            password: hash,
            fullName,
            phone,
            address,
            createdAt: convertDate(new Date()),
            lastLogin: convertDate(new Date()),
          })
            .then(() => {
              return true;
            })
            .catch((err) => {
              throw Error(err);
            });
        }
      });
    }
  });
};
