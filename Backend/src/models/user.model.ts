import mongoose from "mongoose";
import { comparePassword, hashvalue } from "../utils/bcrypt";
export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
    __v: number;
  comparePassword: (val: string) => Promise<boolean>;
  omitPassword: () =>Pick<UserDocument, "_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v">;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashvalue(this.password);
  next();
  
});

userSchema.methods.comparePassword = async function (val: string) {
  return comparePassword(val, this.password);
};
userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
