"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";

const RightBar = () => {
  return (
    <div className="h-screen max-h-screen w-full p-2 pt-4 pl-6 overflow-y-scroll hidescrollbar">
      <div className="flex flex-col gap-4 border-2 border-gray-800 rounded-xl px-4 py-3">
        <div className="flex flex-col gap-3">
          <p className="font-extrabold tracking-wide">New to X ?</p>
          <p className="text-sm font-light tracking-wide text-gray-500">
            Sign up now to get your own personalized timeline!
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-black rounded-full flex justify-center items-center gap-2 font-bold cursor-pointer hover:bg-slate-100 overflow-hidden">
            {/* <span className="text-xl">
              <FcGoogle />
            </span>
            <span>Sign up with Google</span> */}
            <GoogleLogin
              text={"signup_with"}
              shape="pill"
              width={300}
              logo_alignment="center"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
          <div className="bg-white text-black p-1 py-2 rounded-full flex justify-center items-center gap-2  font-bold cursor-not-allowed hover:bg-slate-100">
            <span className="text-xl">
              <FaApple />
            </span>
            <span>Sign up with Apple</span>
          </div>
          <div className="bg-white text-black p-1 py-2 rounded-full flex justify-center items-center gap-2  font-bold cursor-not-allowed hover:bg-slate-100">
            Create Account
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <p className="">
            <span>By signing up, you agree to the </span>
            <span className="text-sky-600 hover:underline cursor-pointer">
              Terms of Service{" "}
            </span>
            and{" "}
            <span className="text-sky-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>
            , including{" "}
            <span className="text-sky-600 hover:underline cursor-pointer">
              Cookie Use
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
