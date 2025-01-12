import React, { useMemo, useState } from "react";
import Image from "@node_modules/next/image";
import { PostProps, Comment } from "@types";
import { useRouter } from "next/navigation";
import { IoIosMore } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdBookmarkBorder } from "react-icons/md";
import { RiShare2Fill } from "react-icons/ri";
import { graphqlClient } from "@clients/api";
import { deleteCommentMutation } from "@graphql/mutation/post";
import toast from "react-hot-toast";
import { useGetCurrentUserDetails } from "@hooks/user";
import {
  FollowUserMutation,
  UnFollowUserMutation,
} from "@graphql/mutation/user";

const CommentCard = ({
  comment,
  postData,
}: {
  comment: Comment;
  postData: PostProps;
}) => {
  const router = useRouter();
  const { user } = useGetCurrentUserDetails();
  const [showMore, setShowMore] = useState(false);
  const [follow, setFollow] = useState(false);

  //delete's comment
  const handleDeletePost = async () => {
    try {
      await graphqlClient.request(deleteCommentMutation, {
        commentId: comment.id,
      });
      toast.success("Post Deleted Successfully");
      setShowMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  //determines if user is following the author of the post
  const amIfollowing = useMemo(() => {
    const following = user?.following?.find((ele) =>
      ele ? ele.id == comment.author.id : null
    );
    setFollow(following ? true : false);
    if (following) return true;
    return false;
  }, [user]);

  //follow's and unfollow's the author of the post
  const followUnfollow = async (followingId: string, followerId: string) => {
    follow
      ? await graphqlClient.request(UnFollowUserMutation, {
          to: followingId,
        })
      : await graphqlClient.request(FollowUserMutation, {
          to: followingId,
        });
    toast.success(
      `${follow ? "Unfollowed" : "Followed"} ${comment.author.firstName}`
    );
    setFollow((e) => !e);
  };
  return (
    <div className="w-full flex gap-4 p-2 pr-4 border-b-2 border-gray-800 text-gray-200 tracking-wide">
      <div className="w-fit flex justify-center items-start">
        <Image
          onClick={() => {
            router.push(`/user/${comment.author.id}`);
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
          <div className="flex items-center gap-2.5">
            <span
              className="text-base font-bold cursor-pointer hover:underline"
              onClick={() => {
                router.push(`/user/${comment.author.id}`);
              }}
            >
              {comment.author.firstName
                ? comment.author.firstName.slice(0, 1).toUpperCase() +
                  comment.author.firstName.slice(1)
                : ""}
            </span>
            <span className="text-sm tracking-wider text-gray-500 cursor-pointer">
              @{comment.author.firstName?.toLocaleLowerCase()} .{" "}
            </span>
            <span className="text-sm tracking-wide text-gray-500 cursor-pointer hover:underline">
              {new Date(parseInt(comment.createdAt ? comment.createdAt : ""))
                .toString()
                .slice(4, 10) +
                ", " +
                new Date(parseInt(comment.createdAt ? comment.createdAt : ""))
                  .toString()
                  .slice(11, 15)}
            </span>
          </div>
          <div
            className="text-xl text-gray-300 cursor-pointer hover:bg-blue-950 p-1 rounded-xl relative"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            <IoIosMore className="hover:bg-blue-950 rounded-xl" />
            <div
              className={`border-2 w-fit border-gray-700 text-sm bg-black p-1.5 px-2 rounded-lg absolute top-7 -right-1 z-10 ${
                showMore ? "flex text-nowrap" : "hidden"
              } hover:bg-gray-900 cursor-pointer`}
            >
              {user?.id === comment.author.id ? (
                <span onClick={handleDeletePost}>Delete Comment</span>
              ) : (
                <span
                  onClick={() =>
                    followUnfollow(
                      comment.author.id ? comment.author.id : "",
                      user ? user.id : ""
                    )
                  }
                >
                  {amIfollowing ? "" : ""}
                  {follow ? "Unfollow " : "Follow "}
                  {comment.author.firstName
                    ? comment.author.firstName.slice(0, 1).toUpperCase() +
                      comment.author.firstName.slice(1)
                    : ""}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-justify text-sm cursor-pointer">
          <span>{comment.comment}</span>
        </div>
        <div className="flex justify-between text-xl text-gray-500 cursor-not-allowed">
          <div className="flex flex-1 justify-between">
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full relative -left-2.5">
              <IoChatbubbleOutline />
            </span>
            <span
              className={`flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-red-700 p-1 px-2 rounded-full`}
            >
              <IoMdHeartEmpty />
            </span>
            <span className="flex text-lg">
              <span className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full">
                <MdBookmarkBorder />
              </span>
            </span>
            <span className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full text-lg relative left-1">
              <RiShare2Fill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
