import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";
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
  const accessToken = req.cookies.accessToken as string || undefined;
  const { payload } = verifyToken(accessToken || "");
  if (payload) {
    await sessionModel.findByIdAndDelete(payload.sessionId);
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout Successfully",
  });
});

const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string || undefined;
  appAsserts(refreshToken, UNAUTHORIZED, "Unauthorized");
})
export { registerHandler, loginHandler,logoutHandler,refreshHandler };
