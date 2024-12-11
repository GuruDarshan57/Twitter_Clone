"use client";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuRepeat2 } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { RiShare2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUserDetails } from "@hooks/user";
import { graphqlClient } from "@clients/api";
import {
  BookmarkPostMutation,
  UnBookmarkPostMutation,
  UnLikePostMutation,
} from "@graphql/mutation/post";
import { LikePostMutation } from "@graphql/mutation/post";

interface PostProps {
  data: {
    id: string;
    content: string;
    imageUrl?: string | null;
    author: {
      id: string;
      firstName: string;
      lastName?: string | null;
      profileImgUrl: string;
    };
    likes: { id: string }[];
    bookmarks: { id: string }[];
  };
}

const PostCard: React.FC<PostProps> = (props) => {
  const [loader, setLoader] = useState(false);
  const { user } = useGetCurrentUserDetails();
  const queryClient = useQueryClient();
  const { data } = props;
  const router = useRouter();
  const [pre, setPre] = useState(false);
  const [like, setLike] = useState(
    data.likes.find((ele) => (user ? ele.id == user.id : null)) ? true : false
  );
  const [bookmark, setBookmark] = useState(
    data.bookmarks.find((ele) => (user ? ele.id == user.id : null))
      ? true
      : false
  );

  const like_unlikePost = useCallback(
    async (like: boolean, postId: string, userId: string) => {
      like
        ? await graphqlClient.request(UnLikePostMutation, { postId })
        : await graphqlClient.request(LikePostMutation, { postId });
      setLike(!like);
      like
        ? (data.likes = data.likes.filter((ele) => ele.id != userId))
        : data.likes.push({ id: userId });
    },
    []
  );

  const bookmark_unbookmarkPost = useCallback(
    async (bookmark: boolean, postId: string, userId: string) => {
      bookmark
        ? await graphqlClient.request(UnBookmarkPostMutation, { postId })
        : await graphqlClient.request(BookmarkPostMutation, { postId });
      setBookmark(!bookmark);
    },
    []
  );
  return (
    <div className="w-full flex gap-4 p-2 pr-4 border-b-2 border-gray-800 text-gray-200 tracking-wide hover:bg-gray-950">
      <div className="w-fit flex justify-center items-start">
        {data.author.profileImgUrl ? (
          loader ? (
            <Loader />
          ) : (
            <Image
              className="w-10 h-10 object-contain rounded-full cursor-pointer"
              src={data.author.profileImgUrl}
              height={100}
              width={100}
              alt="Profile Photo"
              placeholder="empty"
            />
          )
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span
              className="text-base font-bold cursor-pointer hover:underline"
              onClick={() => {
                user?.id === data.author.id
                  ? ""
                  : queryClient.invalidateQueries({
                      queryKey: ["profile-data"],
                    });
                router.push(`/user/${data.author.id}`);
              }}
            >
              {data.author.firstName.slice(0, 1).toUpperCase() +
                data.author.firstName.slice(1) +
                " " +
                (data.author.lastName || "")}
            </span>
            <span className="text-sm text-gray-300 cursor-pointer">
              @{data.author.firstName.toLocaleLowerCase()} .{" "}
            </span>
            <span className="text-sm text-gray-300 cursor-pointer hover:underline">
              1 Oct
            </span>
          </div>
          <div className="text-xl text-gray-300 cursor-pointer hover:bg-blue-950 p-1 rounded-xl">
            <IoIosMore />
          </div>
        </div>
        <div className="flex text-justify text-sm cursor-pointer">
          {data.content}
        </div>

        {data.imageUrl ? (
          <div className="flex w-full justify-center pr-2 py-4 cursor-pointer">
            <Image
              className="w-fit h-48 md:h-72 object-contain rounded-xl border-[0.5px] border-slate-600"
              src={data.imageUrl}
              alt="Post Image"
              height={600}
              width={400}
              onClick={() => {
                setPre(true);
              }}
            />
            {pre ? (
              <div className="h-full w-full flex flex-col justify-center items-center bg-black absolute top-0 left-0 z-10 glass_bg">
                <span
                  className="w-full flex relative"
                  onClick={() => {
                    setPre(false);
                  }}
                >
                  <MdCancel className="absolute right-5 bottom-2" />
                </span>
                <div className="w-full flex justify-center ">
                  <Image
                    className="w-fit h-56 md:h-80 object-contain rounded-xl border-[0.5px] border-slate-600"
                    src={data.imageUrl}
                    alt="Post Image"
                    height={600}
                    width={400}
                    onClick={() => {
                      setPre(true);
                    }}
                  />
                </div>
                <div className="w-full mt-5 flex justify-center ">
                  <Link
                    className="p-1 px-2 rounded-lg border-2 tracking-wide hover:border-green-400"
                    href={data.imageUrl}
                    target="_blank"
                  >
                    Open Original
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-between text-xl text-gray-500">
          <div className="flex flex-1 justify-between relative ">
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer">
              <IoChatbubbleOutline />
              <span className="text-sm place-content-center">201</span>
            </span>
            <span
              className={`flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-red-700 ${
                like ? "text-red-700" : ""
              }  p-1 px-2 rounded-full cursor-pointer`}
              onClick={() => {
                like_unlikePost(like, data.id, user ? user.id : "");
              }}
            >
              {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
              <span className="text-sm">{data.likes.length}</span>
            </span>
            <span className="flex text-lg">
              <span
                className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer"
                onClick={() => {
                  bookmark_unbookmarkPost(
                    bookmark,
                    data.id,
                    user ? user.id : ""
                  );
                }}
              >
                {bookmark ? (
                  <MdBookmark className="text-blue-500" />
                ) : (
                  <MdBookmarkBorder />
                )}
              </span>
            </span>
            <span className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer text-lg">
              <RiShare2Fill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
