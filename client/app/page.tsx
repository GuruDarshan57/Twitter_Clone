"use client";
import React, { Children, useCallback } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { useGetCurrentUserDetails } from "@hooks/user";
import { verifyUserGoogleTokenQuery } from "@graphql/query/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";
import { graphqlClient } from "@clients/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Page = () => {
  const { user } = useGetCurrentUserDetails();
  const Router = useRouter();

  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error("Google token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      if (verifyGoogleToken) {
        window.localStorage.setItem("X_token", verifyGoogleToken);
        toast.success("Login Successful");
        await queryClient.invalidateQueries({ queryKey: ["user-data"] });
        await queryClient.invalidateQueries({ queryKey: ["all-posts"] });
        Router.replace("/home");
      }
    },
    [queryClient]
  );

  useEffect(() => {
    //redirect to home page
    user ? Router.replace("/home") : "";
  }, []);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col lg:flex-row w-full h-fit">
        <div className="flex justify-start lg:justify-center items-center pt-10 lg:pt-0 px-10 md:pl-20 lg:pl-0 lg:px-0 w-full lg:w-3/5">
          <FaXTwitter className="text-5xl lg:text-[330px] text-gray-100 relative lg:top-8 lg:right-5" />
        </div>
        <div className="flex flex-col pt-16 pb-5 lg:pb-5 md:pt-24 md:pl-20 lg:pl-0 items-start w-full px-10 lg:px-0 lg:w-2/5">
          <span className="text-5xl md:text-6xl font-extrabold pb-7 md:pb-10 tracking-wide relative -left-1">
            Happening now
          </span>
          <div className="w-full flex flex-col gap-2">
            <span className="text-3xl font-extrabold pb-7">Join today.</span>
            <div className="text-black w-full md:w-72 rounded-full flex justify-center items-center gap-2 font-bold cursor-pointer hover:bg-slate-100 overflow-hidden">
              <GoogleLogin
                text={"signup_with"}
                shape="pill"
                width={800}
                logo_alignment="center"
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="bg-white w-full md:w-72 text-black p-1 py-2 rounded-full flex justify-center items-center gap-2  font-bold cursor-not-allowed hover:bg-slate-100">
              <span className="text-xl">
                <FaApple />
              </span>
              <span>Sign up with Apple</span>
            </div>
            <div className="w-full md:w-72 text-white p-1 py-2 flex justify-center items-center gap-2  font-bold cursor-not-allowed">
              <div className="flex-1 border-slate-700 border-t-[0.5px] "></div>
              or
              <div className="flex-1 border-slate-700 border-t-[0.5px]"></div>
            </div>
            <div className="bg-sky-500 hover:bg-sky-600 w-full md:w-72 text-white p-1 py-2 rounded-full flex justify-center items-center gap-2  font-bold tracking-wider cursor-not-allowed">
              Sign up with email or phone
            </div>
            <div className=" w-full md:w-72 p-1 py-2 rounded-full justify-center items-center gap-2 text-xs text-gray-600 cursor-not-allowed tracking-wide">
              By signing up, you agree to the{" "}
              <span className="text-sky-600 hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-sky-600 hover:underline">
                Privacy Policy
              </span>
              , including{" "}
              <span className="text-sky-600 hover:underline">Cookie Use</span>.
            </div>
            <div className="w-full md:w-72 text-white p-1 py-2 rounded-fullgap-2 mt-5  font-bold">
              Already have an account?
            </div>
            <div className="w-full md:w-72 text-sky-600 border-slate-700 border-[0.5px] p-1 py-2 rounded-full flex justify-center items-center gap-2  font-bold tracking-wider cursor-not-allowed">
              Sign in
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-4 gap-y-1 px-6 py-3 justify-center items-center">
        <span className="text-xs text-gray-500 hover:underline">About</span>
        <span className="text-xs text-gray-500 hover:underline">
          Download the X app
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Help Center
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Terms of Service
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Privacy Policy
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Cookie Policy
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Accessibility
        </span>
        <span className="text-xs text-gray-500 hover:underline">Ads info</span>
        <span className="text-xs text-gray-500 hover:underline">Blog</span>
        <span className="text-xs text-gray-500 hover:underline">Careers</span>
        <span className="text-xs text-gray-500 hover:underline">
          Brand Resources
        </span>
        <span className="text-xs text-gray-500 hover:underline">
          Advertising
        </span>
        <span className="text-xs text-gray-500 hover:underline">Marketing</span>
        <span className="text-xs text-gray-500 hover:text-sky-600 hover:underline">
          X for Business
        </span>
        <span className="text-xs text-gray-500 hover:text-sky-600 hover:underline">
          Developers
        </span>
        <span className="text-xs text-gray-500 hover:text-sky-600 hover:underline">
          Directory
        </span>
        <span className="text-xs text-gray-500 hover:text-sky-600 hover:underline">
          Settings
        </span>
        <span className="text-xs text-gray-500 hover:text-sky-600 hover:underline">
          © 2024 X Corp.
        </span>
      </div>
    </div>
  );
};

export default Page;
