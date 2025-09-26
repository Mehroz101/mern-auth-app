import { useQuery } from "@tanstack/react-query";
import React from "react";
import { EmailVerifyFunction } from "../lib/api";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => {
  const { code } = useParams();
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["emailVerify", code],
    queryFn: async () => EmailVerifyFunction(code),
  });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
        {isLoading && <div className="text-lg">Loading...</div>}
        {isError && (
          <div className="text-lg text-red-500 block">
            Error verifying email. Please try again.
          </div>
        )}
        {isSuccess && (
          <div className="text-lg text-green-500">
            Email verified successfully! You can now log in.
          </div>
        )}
        <div>
          <Link to={"/"} className="py-2 px-3 mt-4 rounded-lg cursor-pointer active:bg-green-800  bg-green-700 text-white font-semibold block">
            GO HOME
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
