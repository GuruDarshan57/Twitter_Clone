import React from "react";
import { PiImage } from "react-icons/pi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "@node_modules/next/image";
import { useGetCurrentUserDetails } from "@hooks/user";

const CommentBar = ({
  postId,
  comment,
  setComment,
  handleCommentPost,
}: {
  postId: string;
  comment: string;
  setComment: Function;
  handleCommentPost: Function;
}) => {
  const { user } = useGetCurrentUserDetails();
  return (
    <div className="w-full flex gap-4">
      <div className="w-12 flex justify-center items-start">
        <Image
          className="w-10 h-10 object-contain rounded-full cursor-pointer"
          src={user ? user.profileImgUrl : ""}
          height={100}
          width={100}
          alt="Profile Photo"
          placeholder="empty"
        />
      </div>
      <div className="w-full flex flex-col">
        <textarea
          className="w-full bg-gray-950 p-1 text-base tracking-wide outline-none"
          name="comment"
          id="comment"
          placeholder="Post your reply ..."
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="w-full flex justify-between items-center p-1 py-2 pb-3">
          <div className="text-sky-400 text-lg sm:text-xl flex gap-2 sm:gap-4">
            <PiImage className="cursor-not-allowed text-sky-700" />
            <HiOutlineGif className="cursor-not-allowed text-sky-700" />
            <HiOutlineChartBar className="cursor-not-allowed text-sky-700" />
            <HiOutlineEmojiHappy className="cursor-not-allowed text-sky-700" />
            <HiMiniCalendarDays className="cursor-not-allowed text-sky-700" />
            <HiOutlineLocationMarker className="cursor-not-allowed text-sky-700" />
          </div>
          <button
            onClick={() => handleCommentPost()}
            className={` font-bold p-1 px-4 tracking-wider rounded-full ${
              comment.length === 0
                ? "cursor-not-allowed bg-sky-700"
                : "cursor-pointer bg-sky-600 hover:bg-sky-700"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
