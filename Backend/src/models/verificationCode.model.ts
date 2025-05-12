import mongoose from "mongoose";
import VerificationCodeTypes from "../constants/verifcationCode";

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  code: VerificationCodeTypes;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerificationCode = mongoose.model<VerificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
    "verification_codes"
);
export default VerificationCode;