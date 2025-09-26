import React from "react";
import userAuth from "../hooks/userAuth";
import { Navigate, Outlet, redirect } from "react-router-dom";
const AppContainer = () => {
  const { user, isLoading } = userAuth();
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-blue-100 text-center">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
              Loading...
            </h1>
          </div>
        </div>
      ) : user ? (
        <Outlet />
      ) : (
        <Navigate
          to="/login"
          replace
          state={{
            redirectUrl: window.location.pathname,
          }}
        />
      )}
    </>
  );
};

export default AppContainer;
