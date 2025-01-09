"use client";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { RiShare2Fill } from "react-icons/ri";
import { PiImage } from "react-icons/pi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUserDetails } from "@hooks/user";
import { graphqlClient } from "@clients/api";
import {
  AddCommentMutation,
  BookmarkPostMutation,
  UnBookmarkPostMutation,
  UnLikePostMutation,
} from "@graphql/mutation/post";
import { LikePostMutation } from "@graphql/mutation/post";
import toast from "react-hot-toast";
import { PostProps } from "@types";
import CommentBar from "./CommentBar";

const PostCard = ({ data }: { data: PostProps }) => {
  const [loader, setLoader] = useState(false);
  const { user } = useGetCurrentUserDetails();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [pre, setPre] = useState(false);
  const [like, setLike] = useState(
    data.likes.find((ele) => (user ? ele.id == user.id : null)) ? true : false
  );
  const [commentPopup, setCommentPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [bookmark, setBookmark] = useState(
    data.bookmarks.find((ele) => (user ? ele.id == user.id : null))
      ? true
      : false
  );

  const handlePostComment = async () => {
    try {
      if (comment.length === 0) return toast.error("Comment can't be empty");
      await graphqlClient.request(AddCommentMutation, {
        postId: data.id,
        comment: comment,
      });
      toast.success("Comment Added");
      setCommentPopup(false);
      setComment("");
      data.comments.push({ id: "123", author: {} });
    } catch (err) {
      console.log(err);
    }
  };

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
              onClick={() => {
                router.push(`/user/${data.author.id}`);
              }}
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
          <div
            className="flex items-center gap-2"
            onClick={() => {
              router.push(`/user/${data.author.id}`);
            }}
          >
            <span className="text-base font-bold cursor-pointer hover:underline">
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
        <div
          className="flex text-justify text-sm cursor-pointer"
          onClick={() => router.push(`/post/${data.id}`)}
        >
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
          <div className="flex flex-1 justify-between">
            <span
              onClick={() => {
                setCommentPopup(true);
              }}
              className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer"
            >
              <IoChatbubbleOutline />
              <span className="text-sm place-content-center">
                {data.comments.length > 0 ? data.comments.length : ""}
              </span>
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
              <span className="text-sm">
                {data.likes.length > 0 ? data.likes.length : ""}
              </span>
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
          {commentPopup ? (
            <div className="w-full h-full flex justify-center text-white bg-black absolute top-0 left-0 z-10 glass_bg">
              <div className="w-full h-fit flex flex-col gap-2 bg-gray-950 mx-10 mt-5 p-2 px-4 border-gray-800 border-2 rounded-2xl">
                <span className="w-full relative">
                  <MdCancel
                    onClick={() => setCommentPopup(false)}
                    className="absolute right-2 top-3 hover:text-white cursor-pointer"
                  />
                </span>
                <div className="w-full mt-6 flex gap-2">
                  <div className="w-12 flex flex-col items-center justify-between gap-2">
                    <Image
                      className="w-10 h-10 object-contain rounded-full cursor-pointer"
                      src={data.author.profileImgUrl}
                      height={100}
                      width={100}
                      alt="Profile Photo"
                      placeholder="empty"
                    />
                    <div className="w-[2px] h-full bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
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
                    <div
                      className="flex text-justify text-sm cursor-pointer"
                      onClick={() => router.push(`/post/${data.id}`)}
                    >
                      {data.content}
                    </div>
                    {data.imageUrl ? (
                      <div className="flex w-full justify-center pr-2 py-4">
                        <Image
                          className="w-fit h-48 md:h-72 object-contain rounded-xl border-[0.5px] border-slate-600"
                          src={data.imageUrl}
                          alt="Post Image"
                          height={600}
                          width={400}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex gap-1 text-gray-500 font-bold text-sm">
                      <span>Replying to </span>
                      <span className="text-blue-400 cursor-pointer">
                        {" "}
                        @{data.author.firstName.toLocaleLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <CommentBar
                  postId={data.id}
                  comment={comment}
                  setComment={setComment}
                  handleCommentPost={handlePostComment}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
