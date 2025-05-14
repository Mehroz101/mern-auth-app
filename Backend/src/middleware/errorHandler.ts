import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((error) => ({
    path: error.path.join("."),
    message: error.message,
  }));
  return res.status(BAD_REQUEST).json({
    message: err.message,
    errors,
  });
};

const handleAppError = (res: Response, err: AppError) => {
   res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  });
};
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`Path: ${req.path}`, err);
  if(req.path === REFRESH_PATH){
    clearAuthCookies(res);
  }
  if (err instanceof z.ZodError) {
    handleZodError(res, err);
  }
  if (err instanceof AppError) {
    return handleAppError(res, err);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");

  return next();
};

export default errorHandler;
