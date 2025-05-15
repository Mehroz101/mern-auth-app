import catchErrors from "../utils/catchErrors";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import {
  clearAuthCookies,
  GetAccessTokenCookieOptions,
  GetRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  ResetPasswordSchema,
  VerificationCodeSchema,
} from "./auth.schemas";
import { verifyToken } from "../utils/jwt";
import sessionModel from "../models/session.model";
import appAsserts from "../utils/appAsserts";

const registerHandler = catchErrors(async (req, res) => {
  // Registration logic here
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { user, refreshToken, accessToken } = await createAccount(request);
  return setAuthCookies({ res, refreshToken, accessToken })
    .status(CREATED)
    .json(user);
});

const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken } = await loginUser(request);
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successfully",
  });
});

const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = (req.cookies.accessToken as string) || undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await sessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout Successfully",
  });
});

const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = (req.cookies.refreshToken as string) || undefined;
  appAsserts(refreshToken, UNAUTHORIZED, "Unauthorized");
  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, GetRefreshTokenCookieOptions());
  }
  return res
    .status(OK)
    .cookie("accessToken", accessToken, GetAccessTokenCookieOptions())
    .json({
      message: "Refresh token successfully",
    });
});
const verifyEmailHandler = catchErrors(async (req, res) => {
  console.log("req.params.code", typeof req.params.code);
  const verificationCode = VerificationCodeSchema.parse({
    code: req.params.code,
  });
  console.log("verificationCode", verificationCode);
  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: "Email verified successfully" });
});
const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);
  await sendPasswordResetEmail(email);
  return res.status(OK).json({ message: "Email sent successfully" });
});

const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = ResetPasswordSchema.parse(req.body);
  await resetPassword(request);
  return clearAuthCookies(res).status(OK).json({ message: "Password reset" });
});
export {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  verifyEmailHandler,
  sendPasswordResetHandler,
  resetPasswordHandler
};
