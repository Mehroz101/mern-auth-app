import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user.model";
import { SessionDocument } from "../models/session.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};
export type RefershTokenPayload = {
  sessionId: UserDocument["_id"];
};
type SignOptionAndSecret = SignOptions & {
  secret: string;
};
const defaults: SignOptions = {
  audience: ["user"],
};
const AccessTokenSignOptions: SignOptionAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};
export const RefreshTokenSignOptions: SignOptionAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefershTokenPayload,
  options?: SignOptionAndSecret
) => {
  const { secret, ...signOpts } = options || AccessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = <Tpayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = JWT_SECRET, ...verifyOps } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOps,
    }) as Tpayload;
    return {
      payload
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
