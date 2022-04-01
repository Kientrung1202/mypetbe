import "dotenv/config";
import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.MY_DB || "",
  process.env.MY_USER || "",
  process.env.MY_PW || "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
export const db = {
  Sequelize,
  sequelize,
};
