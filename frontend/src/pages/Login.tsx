import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className=" mx-auto  ">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Sign into your account
          </h1>
          <div className="form w-[300px] bg-white shadow-lg rounded-lg p-6 ">
            <form action="">
              <div className="form-group flex flex-col mb-4">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border border-gray-300 p-1 rounded"
                />
              </div>
              <div className="form-group flex flex-col mb-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="border border-gray-300 p-1 rounded"
                />
              </div>
              <div className="text-right w-full">
                <Link
                  to="/forgot-password"
                  className="text-blue-500 text-sm mb-4 "
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-1.5 mt-4 rounded w-full active:bg-blue-600 cursor-pointer"
              >
                Login
              </button>
              <div className="text-center w-full mt-3">
                <span className=" text-sm mb-4 ">
                  Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
