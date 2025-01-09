import React from "react";
import Image from "@node_modules/next/image";
import { PostProps, Comment } from "@types";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";

const CommentCard = ({
  comment,
  postData,
}: {
  comment: Comment;
  postData: PostProps;
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex gap-4 p-2 pr-4 border-b-2 border-gray-800 text-gray-200 tracking-wide">
      <div className="w-fit flex justify-center items-start">
        <Image
          onClick={() => {
            router.push(`/user/${comment.author}`);
          }}
          className="w-10 h-10 object-contain rounded-full cursor-pointer"
          src={comment.author.profileImgUrl ? comment.author.profileImgUrl : ""}
          height={100}
          width={100}
          alt="Profile Photo"
          placeholder="empty"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span
              className="text-base font-bold cursor-pointer hover:underline"
              onClick={() => {
                router.push(`/user/${comment.author.id}`);
              }}
            >
              {comment.author.firstName
                ? comment.author.firstName.slice(0, 1).toUpperCase() +
                  comment.author.firstName.slice(1) +
                  " " +
                  (comment.author.lastName || "")
                : ""}
            </span>
            <span className="text-sm text-gray-300 cursor-pointer">
              @{comment.author.firstName?.toLocaleLowerCase()} .{" "}
            </span>
            <span className="text-sm text-gray-300 cursor-pointer hover:underline">
              1 Oct
            </span>
          </div>
          <div className="text-xl text-gray-300 cursor-pointer hover:bg-blue-950 p-1 rounded-xl">
            <IoIosMore />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-justify text-sm cursor-pointer">
          <span className="text-gray-400 font-bold text-xs">
            Replying to{" "}
            <span
              className="text-blue-400"
              onClick={() => {
                router.push(`/user/${postData.author.id}`);
              }}
            >
              @{postData.author.firstName}
            </span>
          </span>
          <span>{comment.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
