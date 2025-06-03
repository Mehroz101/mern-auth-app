import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFunction} from "../lib/api"
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isError, error, isPending, mutate: registerUser } = useMutation({
    mutationFn: RegisterFunction,
    onSuccess: () => {
      navigate("/", {
        replace: true
      });
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700  text-center tracking-tight  mb-2">
            Create your account
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
         {isError ? <span className="text-red-500">{error?.message || "Something went wrong"}</span> : "Please enter your credentials to continue."}
        </p>
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
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
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
              placeholder="Enter your password"
              className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 rounded-lg outline-none transition"
            />
            <span className="text-gray-500 text-xs">password must be at least 6 characters</span>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2 rounded-lg outline-none transition"
            />
          </div>
        
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              RegisterFunction({email, password, confirmPassword});
            }}
            disabled={isPending || !email || !password || !confirmPassword}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 py-2 rounded-lg shadow  ${
              isPending || !email || !password || !confirmPassword
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 transition active:scale-95"
            }`}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
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

export default Register;
