import API from "../config/apiClient";

export function LoginFunction(data) {
  return API.post("/auth/login", data);
}
export function RegisterFunction(data) {
  return API.post("/auth/register", data);
}
