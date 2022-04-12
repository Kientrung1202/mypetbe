import { db } from "../db";
// import { Sequelize } from "sequelize/types";
// import { Sequelize, Model, Sequelize } from "sequelize";
import { ROLE } from "./interface";
import Sequelize from "sequelize";

const User = db.sequelize.define(
  "users",
  {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING(40),
      allowNull: false,
      unique: true,
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
      get() {
        return this.getDataValue("role");
      },
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
    timestamps: false,
  }
);
export default User;
