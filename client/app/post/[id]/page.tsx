"use client";
import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useGetCurrentUserDetails } from "@hooks/user";
import { graphqlClient } from "@clients/api";
import X3Layout from "@components/X3Layout";
import Loader from "@components/Loader";
import { getPostQuery } from "@graphql/query/posts";
import PostCard from "@components/PostCard";
import { PostProps } from "@types";
import CommentBar from "@components/CommentBar";
import { AddCommentMutation } from "@graphql/mutation/post";
import toast from "react-hot-toast";
import CommentCard from "@components/CommentCard";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  const [postData, setPostData] = useState({} as PostProps);
  const [comment, setComment] = useState("");
  const { user } = useGetCurrentUserDetails();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { getPost } = await graphqlClient.request(getPostQuery, {
      getPostId: params.id,
    });
    setPostData(getPost as PostProps);
  };

  const handlePostComment = async () => {
    try {
      if (comment.length === 0) return toast.error("Comment cannot be empty");
      await graphqlClient.request(AddCommentMutation, {
        postId: postData.id,
        comment: comment,
      });
      toast.success("Comment Added");
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <X3Layout
      children={
        !postData.id || !user ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-col pb-20 h-full max-h-screen overflow-y-scroll hidescrollbar">
            <div className="flex w-full p-3 pl-4 justify-start items-center gap-6 glass_bg border-b-[0.5px] border-slate-700 sticky top-0">
              <span
                className="text-xl cursor-pointer rounded-full p-2 hover:bg-gray-900"
                onClick={() => {
                  router.back();
                }}
              >
                <GoArrowLeft />
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wide">Post</span>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col items-start">
              <div className="w-full h-fit flex">
                <PostCard data={postData} />
              </div>
              <div className="w-full p-2 py-3 pr-4">
                <CommentBar
                  postId={postData.id}
                  comment={comment}
                  setComment={setComment}
                  handleCommentPost={handlePostComment}
                />
              </div>
              <div className="w-full h-[0.5px] bg-gray-700"></div>
            </div>
            {postData.comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                postData={postData}
              />
            ))}
          </div>
        )
      }
    />
  );
};

export default page;
