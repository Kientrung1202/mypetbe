import { logErr } from "../../../services/log";
import { badRequest, notFound, serverError } from "../../../utils/response";
import { Request, Response } from "express";

const CommonError = (req: Request, res: Response, err: Error) => {
  logErr(`${req.method} ${req.originalUrl}`, `${err.message}`);
  if (err.message.includes("must not be") || err.message.includes("must be"))
    return res.json(badRequest(err.message));
  if (err.message.includes("must not be") || err.message.includes("must be"))
    return res.json(notFound(err.message));
  return res.json(serverError(err.message));
};
export default CommonError;
