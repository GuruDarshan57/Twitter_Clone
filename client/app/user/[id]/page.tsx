"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useGetCurrentUserDetails, useGetUserData } from "@hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import PostCard from "@components/PostCard";
import { graphqlClient } from "@clients/api";
import {
  FollowUserMutation,
  UnFollowUserMutation,
} from "@graphql/mutation/user";
import X3Layout from "@components/X3Layout";

interface Props {
  params: {
    id: string;
  };
}

const page = ({ params }: Props) => {
  const queryClient = useQueryClient();
  const { profile_data } = useGetUserData(params.id);
  const { user } = useGetCurrentUserDetails();
  const [active, setActive] = useState("Post");
  const [followState, setFollowState] = useState("Follow");
  const router = useRouter();

  // useEffect(() => {
  //   profile_data?.id === params.id
  //     ? ""
  //     : queryClient.invalidateQueries({ queryKey: ["profile-data"] });
  //   !user ? router.replace("/") : "";
  // }, []);

  //to check if the user is following the profile owner or no
  const amIFollowing = useMemo(() => {
    const following = profile_data?.followers?.find(
      (item) => item?.id === user?.id
    );
    setFollowState(following ? "Following" : "Follow");
    return following ? true : false;
  }, [profile_data, user]);

  const handleFollowUnfollow = useCallback(async () => {
    amIFollowing
      ? await graphqlClient.request(UnFollowUserMutation, {
          to: profile_data?.id,
        })
      : await graphqlClient.request(FollowUserMutation, {
          to: profile_data?.id,
        });
    queryClient.invalidateQueries({ queryKey: ["profile-data"] });
  }, [profile_data]);
  return (
    <X3Layout
      children={
        <div className="w-full flex flex-col h-full max-h-screen overflow-y-scroll hidescrollbar">
          <div className="flex w-full p-2 py-1 pl-4 justify-start items-center gap-6 glass_bg border-b-[0.5px] border-slate-700">
            <span
              className="text-xl cursor-pointer rounded-full p-2 hover:bg-gray-900"
              onClick={() => {
                router.back();
              }}
            >
              <GoArrowLeft />
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wide">
                {profile_data
                  ? profile_data.firstName.slice(0, 1).toUpperCase() +
                    profile_data.firstName.slice(1)
                  : ""}
              </span>
              <span className="text-sm text-gray-500">
                {profile_data?.posts?.length || 0} posts
              </span>
            </div>
          </div>
          <div className="w-full h-full flex flex-col max-h-full overflow-y-scroll hidescrollbar">
            <div className="w-full flex flex-col relative pb-2">
              <div className="w-full h-48 bg-neutral-900">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1709884735017-114f4a31f944?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  width={1200}
                  height={800}
                  alt="cover_img"
                  className="w-full h-48 object-cover p-1 rounded-lg"
                />
              </div>
              {profile_data ? (
                <Image
                  src={profile_data?.profileImgUrl}
                  width={400}
                  height={400}
                  alt="profile_img"
                  className="w-32 h-32 rounded-full object-contain -mt-16 ml-4 border-4 border-black"
                />
              ) : (
                ""
              )}
              {params.id === user?.id ? (
                <div className="w-fit p-[5px] px-4 rounded-full border-[0.5px] border-slate-500 absolute right-6 bottom-2 cursor-pointer tracking-wide hover:bg-slate-900">
                  Edit profile
                </div>
              ) : (
                <div
                  className={
                    `w-28 text-center p-[5px] px-4 rounded-full border-[0.5px] bg-white text-black font-semibold absolute right-6 bottom-2 cursor-pointer tracking-wide hover:bg-gray-200` +
                    ` ${
                      amIFollowing
                        ? "hover:border-red-600 hover:bg-none hover:text-red-600"
                        : ""
                    }`
                  }
                  onClick={handleFollowUnfollow}
                  onMouseEnter={() => {
                    setFollowState(amIFollowing ? "Unfollow" : "Follow");
                  }}
                  onMouseLeave={() => {
                    setFollowState(amIFollowing ? "Following" : "Follow");
                  }}
                >
                  {followState}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 p-2 pl-4">
              <div className="flex flex-col mb-1">
                <span className="font-bold text-xl tracking-wide">
                  {profile_data
                    ? profile_data.firstName.slice(0, 1).toUpperCase() +
                      profile_data.firstName.slice(1)
                    : ""}
                </span>
                <span className="tracking-wide text-sm text-gray-500">
                  @{profile_data?.firstName.toLocaleLowerCase()}
                </span>
              </div>
              <div className="flex gap-4 font-thin text-sm tracking-wider text-gray-400">
                <span className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="text-lg" />{" "}
                  <span>New Orleans, LA</span>
                </span>
                <span className="flex items-center gap-2">
                  <HiMiniCalendarDays className="text-lg" />{" "}
                  <span>Joined January 2023</span>
                </span>
              </div>
              <div className="flex gap-4 font-thin text-sm tracking-wider">
                <span className="text-sm text-slate-400">
                  <span className="text-white font-bold">
                    {profile_data?.following?.length || 0}
                  </span>{" "}
                  Following
                </span>
                <span className="text-sm text-slate-400">
                  <span className="text-white font-bold">
                    {profile_data?.followers?.length || 0}
                  </span>{" "}
                  Followers
                </span>
              </div>
            </div>
            <div className="w-full flex font-bold border-slate-700 border-b-[0.5px] cursor-pointer sticky top-0 z-10 glass_bg">
              <div
                className="flex-1 flex justify-center items-center hover:bg-gray-950"
                onClick={() => {
                  setActive("Post");
                }}
              >
                <button className="p-2 pb-3 pt-5 text-sm tracking-wide self-end">
                  Posts
                  <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3"></div>
                </button>
              </div>

              <div
                className="flex-1 flex justify-center items-center hover:bg-gray-950"
                onClick={() => {
                  setActive("Media");
                }}
              >
                <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                  Media
                  <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                </button>
              </div>
              <div
                className="flex-1 flex justify-center items-center hover:bg-gray-950"
                onClick={() => {
                  setActive("Likes");
                }}
              >
                <button className="p-2 pb-3 pt-5  text-sm tracking-wide text-slate-500 self-end">
                  Likes
                  <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-3 invisible"></div>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col">
              {profile_data?.posts ? (
                profile_data.posts.length > 0 ? (
                  profile_data.posts.map((post: any) => {
                    const data = {
                      ...post,
                      author: {
                        id: profile_data?.id,
                        firstName: profile_data?.firstName,
                        lastName: profile_data?.lastName,
                        profileImgUrl: profile_data?.profileImgUrl,
                      },
                    };
                    return <PostCard key={post.id} data={data} />;
                  })
                ) : (
                  <div className="w-full flex justify-center items-center text-slate-500 mt-10 text-lg tracking-wide font-bold">
                    No Posts
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default page;
