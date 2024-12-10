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
import Link from "next/link";

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
  });
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
            <div className="hidden mobile:flex text-black w-full md:w-72 bg-white rounded-full justify-center items-center gap-2 font-bold cursor-pointer hover:bg-slate-100 overflow-hidden">
              <GoogleLogin
                text={"signup_with"}
                shape="pill"
                width={290}
                logo_alignment="center"
                onSuccess={handleLoginWithGoogle}
                auto_select={true}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="mobile:hidden text-black w-full md:w-72 bg-white rounded-full flex justify-center items-center gap-2 font-bold cursor-pointer hover:bg-slate-100 overflow-hidden">
              <GoogleLogin
                text={"signup_with"}
                shape="pill"
                width={350}
                logo_alignment="center"
                onSuccess={handleLoginWithGoogle}
                auto_select={true}
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
              <Link href={"https://x.com/en/tos"} target="_blank">
                <span className="text-sky-600 hover:underline">
                  Terms of Service
                </span>
              </Link>{" "}
              and{" "}
              <Link href={"https://x.com/en/privacy"} target="_blank">
                <span className="text-sky-600 hover:underline">
                  Privacy Policy
                </span>
              </Link>
              , including{" "}
              <Link
                href="https://help.x.com/en/rules-and-policies/x-cookies"
                target="_blank"
              >
                <span className="text-sky-600 hover:underline">Cookie Use</span>
              </Link>
              .
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
        <Link
          href="https://about.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          About
        </Link>
        <Link
          href="https://help.x.com/en/using-x/download-the-x-app"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Download the X app
        </Link>
        <Link
          href="https://help.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Help Center
        </Link>
        <Link
          href="https://x.com/en/tos"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Terms of Service
        </Link>
        <Link
          href="https://x.com/en/privacy"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="https://help.x.com/en/rules-and-policies/x-cookies"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Cookie Policy
        </Link>
        <Link
          href="https://x.com/accessibility"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Accessibility
        </Link>
        <Link
          href="https://help.x.com/en/resources/accessibility"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Ads info
        </Link>
        <Link
          href="https://blog.x.com/"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Blog
        </Link>
        <Link
          href="https://careers.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Careers
        </Link>
        <Link
          href="https://about.x.com/en/who-we-are/brand-toolkit"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Brand Resources
        </Link>
        <Link
          href="https://business.x.com/en/advertising?ref=gl-tw-tw-twitter-advertise"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Advertising
        </Link>
        <Link
          href="https://business.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Marketing
        </Link>
        <Link
          href="https://business.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          X for Business
        </Link>
        <Link
          href="https://developer.x.com/en"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Developers
        </Link>
        <Link
          href="https://x.com/i/directory/profiles"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Directory
        </Link>
        <Link
          href="https://x.com/settings"
          target="_blank"
          className="text-xs text-gray-500 hover:underline"
        >
          Settings
        </Link>
        <span className="text-xs text-gray-500 hover:underline">
          © 2024 X Corp.
        </span>
      </div>
    </div>
  );
};

export default Page;
