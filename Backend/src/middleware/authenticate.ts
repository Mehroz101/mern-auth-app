import { RequestHandler } from "express";
import appAsserts from "../utils/appAsserts";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";


const authenticate:RequestHandler = (req,res,next)=>{
    const accessToken = req.cookies.accessToken as string || undefined;
    appAsserts(accessToken,UNAUTHORIZED,"Not authorized",AppErrorCode.InvalidAccessToken);
    const {error,payload} = verifyToken(accessToken);

    appAsserts(payload,UNAUTHORIZED,error.jwt === "jwt expired" ? "token expired" : "invalid token",AppErrorCode.InvalidAccessToken);
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
    }

    export default authenticate