import "dotenv/config";
import { Sequelize } from "sequelize";

const PG_USER = process.env.MY_USER;
const PG_PASS = process.env.MY_PW;
const PG_URL = process.env.MY_URL;
const PG_PORT = process.env.MY_PORT;
const PG_DB = process.env.MY_DB;

export const sequelize = new Sequelize(
  `postgres://${PG_USER}:${PG_PASS}@${PG_URL}:${PG_PORT}/${PG_DB}`,
  { logging: false }
);

export const db = {
  sequelize,
};
