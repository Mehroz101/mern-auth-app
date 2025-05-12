import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerificationCodeTypes from "../constants/verifcationCode";
import sessionModel from "../models/session.model";
import userModel from "../models/user.model";
import VerificationCode from "../models/verificationCode.model";
import appAsserts from "../utils/appAsserts";
import { comparePassword } from "../utils/bcrypt";
import { OneYearFromNow } from "../utils/date";
import { RefreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
export type CreateAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

const createAccount = async (data: CreateAccountParams) => {
  const existingUser = await userModel.exists({
    email: data.email,
  });

  appAsserts(!existingUser, CONFLICT, "Email already exists");
  const newUser = await userModel.create({
    email: data.email,
    password: data.password,
  });
const userId = newUser._id
  const Verificationcode = await VerificationCode.create({
    userId,
    code: VerificationCodeTypes.EmailVerification,
    expiresAt: OneYearFromNow(),
  });

  const session = await sessionModel.create({
    userId: userId,
    userAgent: data.userAgent,
  });

  const refreshToken = signToken({
    sessionId: session._id,
  });

  const accessToken = signToken(
    {
      userId,
      sessionId: session._id,
    },
    RefreshTokenSignOptions
  );

  return {
    user: newUser.omitPassword(),
    refreshToken,
    accessToken,
  };
};
export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
const loginUser = async ({ email, password, userAgent }: LoginParams) => {
  const user = await userModel.findOne({ email });
  appAsserts(user, UNAUTHORIZED, "email or password is incorrect.");
 const userId = user._id
  const isValid = await comparePassword(password, user.password);
  appAsserts(isValid, UNAUTHORIZED, "email or password is incorrect.");

  const session = await sessionModel.create({
    userId,
    userAgent: userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, RefreshTokenSignOptions);

  const accessToken = signToken({
    userId,
    ...sessionInfo,
  });

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
const refreshUserAccessToken =async (refresh:string) => {
  const {payload } = verifyToken(refresh,{
    secret:RefreshTokenSignOptions.secret
  });
  const now = new Date();
  appAsserts(payload, UNAUTHORIZED, "Unauthorized");
  const session = await sessionModel.findById(payload.sessionId);
  appAsserts(session && session.expiresAt > new Date(), UNAUTHORIZED, "Unauthorized");
  // const user = await userModel.findById(session.userId);
  // appAsserts(user, UNAUTHORIZED, "Unauthorized");
  // const accessToken = signToken({
  //   userId: user._id,
  //   sessionId: session._id,
  // },RefreshTokenSignOptions);
  // return accessToken

};
export { createAccount, loginUser };
