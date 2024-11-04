"use client";
import Tweet from "@components/Tweet";
import { useGetUserDetails } from "@hooks/user";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiImage } from "react-icons/pi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import React, { useCallback } from "react";

const Home: React.FC = () => {
  const { user } = useGetUserDetails();
  const handleImageInput = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  return (
    <div className="col-span-5 w-full h-screen max-h-screen border-slate-700 border-r-[0.5px] border-l-[0.5px]  overflow-y-scroll hidescrollbar">
      <div className="w-full flex border-slate-700 border-b-[0.5px] bg-black cursor-pointer sticky top-0 z-10">
        <div className="flex-1 flex justify-center items-center hover:bg-gray-900">
          <button className="p-2 pt-5 text-sm font-semibold tracking-wide self-end">
            For you
            <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-2"></div>
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center hover:bg-gray-900">
          <button className="p-2 pt-5  text-sm font-semibold tracking-wide text-slate-500 self-end">
            Following
            <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-2 invisible"></div>
          </button>
        </div>
      </div>
      <div className="w-full border-slate-700 border-b-[0.5px] cursor-pointer">
        <div className="flex p-4 pb-0 gap-3">
          <div className="">
            {user && user.profileImgUrl ? (
              <Image
                src={user.profileImgUrl}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <span className="text-4xl">
                <FaRegCircleUser />
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <textarea
              rows={2}
              placeholder={"What's happening ?"}
              className="bg-black tracking-wide p-1 border-slate-700 border-b-[0.5px] outline-none"
            ></textarea>
            <div className="w-full flex justify-between items-center p-1 py-2 pb-3">
              <div className="text-sky-400 text-xl flex gap-4">
                <PiImage onClick={handleImageInput} />
                <HiOutlineGif className="cursor-not-allowed text-sky-700" />
                <HiOutlineChartBar className="cursor-not-allowed text-sky-700" />
                <HiOutlineEmojiHappy className="cursor-not-allowed text-sky-700" />
                <HiMiniCalendarDays className="cursor-not-allowed text-sky-700" />
                <HiOutlineLocationMarker className="cursor-not-allowed text-sky-700" />
              </div>
              <button className="bg-sky-600 font-bold p-1 px-4 tracking-wider hover:bg-sky-700 rounded-full">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
};

export default Home;
