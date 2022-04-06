import { db } from "../db";
// import { Sequelize } from "sequelize/types";
// import { Sequelize, Model, Sequelize } from "sequelize";
import { ROLE } from "./interface";
import Sequelize from "sequelize";
// interface UserInstance extends Model {
//   userId: string;
//   userName: string;
//   password: string;
//   fullName: string;
//   phone: string;
//   address: string;
//   createdAt: string;
//   lastLogin: string;
//   role: number;
// }

const User = db.sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    fullName: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    role: {
      type: Sequelize.BOOLEAN,
      defaultValue: ROLE.customer,
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
  }
);
export default User;
