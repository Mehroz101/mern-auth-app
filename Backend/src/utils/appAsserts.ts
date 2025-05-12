import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
type appAsserts = (
  condition: any,
  HttpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition;


const appAsserts: appAsserts = (
  condition,
  HttpStatusCode,
  message,
  appErrorCode
) => assert(condition, new AppError(message, HttpStatusCode, appErrorCode));
export default appAsserts;
