import { Request, Response } from "express";
import "dotenv/config";
import { db } from "./db";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import glob from "glob";
import generateDb from "./data/generate";

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello trung!");
});
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const connectDb = () => {
  db.sequelize
    .authenticate()
    .then(() => console.log("Connectt database successfully"))
    .catch((err: Error) => console.log("Enable connect database", err));
  generateDb();
};

const initApi = () => {
  app.use((req, res, next) => {
    next();
  });
  app.use(morgan("combined")); //log bug thoi
  app.use(cors()); // loi cors
  // for parsing application/json
  app.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // list router and use it
  // dung docker goi vao thi no ra __dirname = app/dist
  glob(__dirname + "/**/*.controller.js", {}, (err, files) => {
    files.map((file: string) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const api = require(file);
      app.use(api);
    });
    console.log("init api successfully");
  });
};
Promise.all([connectDb(), initApi()])
  .then(() => {
    console.log("Server run");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
