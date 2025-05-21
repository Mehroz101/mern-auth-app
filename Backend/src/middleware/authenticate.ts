import { RequestHandler } from "express";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import appAsserts from "../utils/appAsserts";

// wrap with catchErrors() if you need this to be async
const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAsserts(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAsserts(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;