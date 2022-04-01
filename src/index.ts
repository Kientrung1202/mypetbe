import { NextFunction, Request, Response } from "express";
import "dotenv/config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello trung!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

export default app;
