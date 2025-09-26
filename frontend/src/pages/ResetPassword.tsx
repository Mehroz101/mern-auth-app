import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ResetFunction } from "../lib/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const [isExpired, setIsExpired] = useState(false);
  const code = searchParams.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    const exp = searchParams.get("exp");
    if (exp) {
      const now = Date.now();
      if (now > Number(exp) || !code) {
        setIsExpired(true);
      }
    }
  }, [searchParams]);

  const {
    isError,
    error,
    isPending,
    isSuccess,
    mutate: resetPassword,
  } = useMutation({
    mutationFn: ResetFunction,
  });

  if (isExpired || !code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
            Reset Link Expired
          </h1>
          <p className="text-gray-500 mb-4">
            Your password reset link has expired. Please request a new one.
          </p>
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline font-medium"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700  text-center tracking-tight  mb-2">
          Reset your password
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {isError ? (
            <span className="text-red-500">
              {error?.message || "Something went wrong"}
            </span>
          ) : (
            ""
          )}
        </p>
        {isSuccess ? (
          <div className="text-sm text-center text-green-500 flex flex-col items-center gap-2">
            Your password has been reset successfully. You can now{" "}
            <Link
              to="/login"
              className="text-white font-medium bg-green-700 py-2 px-4  rounded-sm "
            >
              log in
            </Link>
          </div>
        ) : (
          <form className="space-y-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="email"
                placeholder="Enter your new password"
                className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 rounded-lg outline-none transition"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                resetPassword({
                  password,
                  verificationCode: code || "",
                });
              }}
              disabled={isPending || !password}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 py-2 rounded-lg shadow  ${
                isPending || !password
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 transition active:scale-95"
              }`}
            >
              {isPending ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
