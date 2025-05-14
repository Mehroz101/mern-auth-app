import { z } from "zod";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
export const VerificationCodeSchema = z.object({
  code: z.string().min(1).max(24),
})