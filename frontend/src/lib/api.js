import API from "../config/apiClient";

export function LoginFunction(data) {
  return API.post("/auth/login", data);
}
export function RegisterFunction(data) {
  return API.post("/auth/register", data);
}
export function ForgetFunction(data) {
  return API.post("/auth/password/forgot", data);
}
export function EmailVerifyFunction(verificationCode) {
  return API.get(`/auth/email/verify/${verificationCode}`);
}
export function ResetFunction({ verificationCode, password }) {
  return API.post(`/auth/password/reset`, { verificationCode, password });
}
export function getUser() {
  return API.get(`/user`);
}
