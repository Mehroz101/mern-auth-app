import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {LoginFunction} from "../lib/api"
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isError, isPending, mutate:loginUser} = useMutation({
    mutationFn: LoginFunction,
    onSuccess: () => {
      navigate("/", {
        replace: true
      });
    }
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">
          Sign in to your account
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm">
         {isError ? <span className="text-red-500">Invalid email or password</span> : "Please enter your credentials to continue."}
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
          </div>
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-blue-500 text-xs hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              loginUser({email, password});
            }}
            disabled={isPending || !email || !password}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow  ${
              isPending || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 transition active:scale-95"
            }`}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
