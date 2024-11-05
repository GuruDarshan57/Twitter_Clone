import React, { useCallback, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { PiImage } from "react-icons/pi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGetUserDetails } from "@hooks/user";
import Image from "next/image";
import { useCreatePost } from "@hooks/post";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { user } = useGetUserDetails();
  const [content, setContent] = useState("");
  const { mutate } = useCreatePost();

  const handleCreatePost = useCallback(() => {
    mutate({ content: content });
  }, [mutate, content]);

  const handleImageInput = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  return (
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
              <PiUserCircleThin />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col px-1">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
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
            <button
              className="bg-sky-600 font-bold p-1 px-4 tracking-wider hover:bg-sky-700 rounded-full"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
