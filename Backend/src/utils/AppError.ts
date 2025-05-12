import AppErrorCode from "../constants/appErrorCode";
import { HttpStatusCode } from "../constants/http";

class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: HttpStatusCode,
    public errorCode?: AppErrorCode
  ) {
    super(message);
  }
}
export default AppError;
