declare namespace Express {
  import mongoose from "mongoose";
  export interface Request {
    userId: mongoose.Types.ObjectId;
    sessionId: mongoose.Types.ObjectId;
  }
}