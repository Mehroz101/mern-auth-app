import { CookieOptions, Response } from "express";
import { FifteenMinutesFromNow, ThirtyDaysFromNow } from "./date";
export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: secure,
};
const GetAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: FifteenMinutesFromNow(),
});

const GetRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaults,
  expires: ThirtyDaysFromNow(),
  path: REFRESH_PATH,
});

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};
export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) => {
  return res
    .cookie("accessToken", accessToken, GetAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, GetRefreshTokenCookieOptions());
};

export const clearAuthCookies = (res: Response) => {
 return res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: REFRESH_PATH,
  });
};
