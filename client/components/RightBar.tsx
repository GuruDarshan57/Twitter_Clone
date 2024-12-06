"use client";
import React, { useCallback } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { graphqlClient } from "@clients/api";
import { verifyUserGoogleTokenQuery } from "@graphql/query/user";
import { useGetCurrentUserDetails } from "@hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";

const RightBar = () => {
  const { user } = useGetCurrentUserDetails();
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
      }
    },
    [queryClient]
  );
  return (
    <div className="h-screen max-h-screen w-full p-2 pt-4 pl-6 overflow-y-scroll hidescrollbar">
      {!user ? (
        <div className="flex flex-col gap-4 border-2 border-gray-800 rounded-xl px-4 py-3">
          <div className="flex flex-col gap-3">
            <p className="font-extrabold tracking-wide">New to X ?</p>
            <p className="text-sm font-light tracking-wide text-gray-500">
              Sign up now to get your own personalized timeline!
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-black bg-white rounded-full flex justify-center items-center gap-2 font-bold cursor-pointer hover:bg-slate-100 overflow-hidden">
              <GoogleLogin
                text={"signup_with"}
                shape="pill"
                width={330}
                logo_alignment="center"
                onSuccess={handleLoginWithGoogle}
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
              <Link
                href={"https://x.com/en/tos"}
                target="_blank"
                className="text-xs text-gray-500 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href={"https://x.com/en/privacy"}
                target="_blank"
                className="text-xs text-gray-500 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              , including{" "}
              <Link
                href="https://help.x.com/en/rules-and-policies/x-cookies"
                target="_blank"
                className="text-xs text-gray-500 hover:underline"
              >
                Cookie Use
              </Link>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 ">
          <div className="w-full group flex items-center h-11 bg-zinc-900 rounded-full px-2 hover:border-[0.5px] hover:border-sky-500">
            <span className="text-2xl text-zinc-600 px-2 group-hover:text-sky-500">
              <IoSearchOutline />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-7 rounded-lg pl-4 outline-none bg-transparent placeholder:font-light placeholder:tracking-wide"
            />
          </div>
          {user?.recommendedUsers ? (
            <div className="w-full border-slate-700 border-[0.5px] rounded-lg flex flex-col px-4 py-3 gap-3">
              <span className="font-extrabold tracking-wide text-lg">
                Who to follow
              </span>
              {user.recommendedUsers.map((user) => {
                return user ? (
                  <div className="flex items-center gap-3">
                    <Image
                      src={user ? user.profileImgUrl : ""}
                      width={100}
                      height={100}
                      alt={"profile image"}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 flex flex-col items-start justify-between">
                      <Link
                        href={`/user/${user.id}`}
                        className="text-sm font-bold cursor-pointer hover:underline"
                      >
                        {user.firstName.slice(0, 1).toUpperCase() +
                          user.firstName.slice(1) +
                          " " +
                          (user.lastName || "")}
                      </Link>
                      <span className="text-xs text-gray-300 cursor-pointer">
                        {" "}
                        @{user.firstName.toLocaleLowerCase()}
                      </span>
                    </div>
                    <Link
                      href={`/user/${user.id}`}
                      className="w-fit h-fit text-center p-[5px] px-4 rounded-full border-[0.5px] bg-white text-black text-sm font-semibold cursor-pointer tracking-wide hover:bg-gray-200"
                    >
                      View
                    </Link>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      <div className="w-full flex flex-wrap gap-2 text-gray-500 px-1 py-3">
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
        <span className="text-xs hover:underline">More</span>
        <span className="text-xs hover:underline">© 2024 X Corp.</span>
      </div>
    </div>
  );
};

export default RightBar;
