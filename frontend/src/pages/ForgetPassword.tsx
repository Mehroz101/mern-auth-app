import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ForgetFunction } from "../lib/api";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const {
    isError,
    error,
    isPending,
    isSuccess,
    mutate: forgetPassword,
  } = useMutation({
    mutationFn: ForgetFunction,
    onSuccess: () => {},
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700  text-center tracking-tight  mb-2">
          {isSuccess ? "Check your email" : "Forgot your password?"}
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
          {isError ? (
            <span className="text-red-500">
              {error?.message || "Something went wrong"}
            </span>
          ) : isSuccess === false && (
            "Please enter your credentials to continue."
          )}
        </p>
        {isSuccess ? (
          <div className="text-sm text-center text-green-500 mb-4">
            A reset link has been sent to your email address. Please check your
            inbox.
          </div>
        ) : (
          <form className="space-y-6">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="Enter your email address"
                className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 rounded-lg outline-none transition"
              />
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                forgetPassword({ email });
              }}
              disabled={isPending || !email}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 py-2 rounded-lg shadow  ${
                isPending || !email
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 transition active:scale-95"
              }`}
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
