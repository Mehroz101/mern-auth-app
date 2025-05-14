import { APP_ORIGIN } from "../constants/env";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "../constants/http";
import VerificationCodeTypes from "../constants/verifcationCode";
import sessionModel from "../models/session.model";
import userModel from "../models/user.model";
import VerificationCode from "../models/verificationCode.model";
import appAsserts from "../utils/appAsserts";
import { comparePassword } from "../utils/bcrypt";
import { ONE_DAY_MS, OneYearFromNow, ThirtyDaysFromNow } from "../utils/date";
import { getVerifyEmailTemplate } from "../utils/emailTemplates";
import { RefreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
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
  const userId = newUser._id;
  const Verificationcode = await VerificationCode.create({
    userId,
    code: VerificationCodeTypes.EmailVerification,
    expiresAt: OneYearFromNow(),
  });
  const url = `${APP_ORIGIN}/email/verify/${Verificationcode._id}`;

  await sendMail({
    to: data.email,
    ...getVerifyEmailTemplate(url),
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
  const userId = user._id;
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
const refreshUserAccessToken = async (refresh: string) => {
  const { payload } = verifyToken(refresh, {
    secret: RefreshTokenSignOptions.secret,
  });
  const now = new Date();
  appAsserts(payload, UNAUTHORIZED, "Unauthorized");
  const session = await sessionModel.findById(payload.sessionId);
  appAsserts(
    session && session.expiresAt.getTime() > now.getTime(),
    UNAUTHORIZED,
    "Unauthorized"
  );
  const sessionNeedsRefresh =
    session.expiresAt.getTime() - now.getTime() <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    session.expiresAt = ThirtyDaysFromNow();
    await session.save();
  }
  const newRefreshToken = sessionNeedsRefresh
    ? signToken(
        {
          sessionId: payload.sessionId,
        },
        RefreshTokenSignOptions
      )
    : undefined;
  const accessToken = signToken({
    userId: payload.userId,
    sessionId: payload.sessionId,
  });
  return {
    accessToken,
    newRefreshToken: newRefreshToken,
  };
};

const verifyEmail = async (code: string) => {
  //get verification code
  const validCode = await VerificationCode.findOne({
    _id: code,
    code: VerificationCodeTypes.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAsserts(
    validCode,
    UNAUTHORIZED,
    "Verification code is invalid or expired"
  );

  //get user by id and update verified to true and update user
  const updatedUser = await userModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );
  appAsserts(updatedUser, INTERNAL_SERVER_ERROR, "failed to verify email");
  //delete verification code
  await validCode.deleteOne();
  //return user
  return {
    user: updatedUser.omitPassword(),
  };
};

export { createAccount, loginUser, refreshUserAccessToken, verifyEmail };
