"use client";
import React, { useCallback } from "react";
import { useGetAllPosts } from "@hooks/post";
import PostCard from "@components/PostCard";
import HomeTopBar from "@components/HomeTopBar";
import CreatePost from "@components/CreatePost";

const Home: React.FC = () => {
  const { posts = [] } = useGetAllPosts();

  return (
    <div className="w-full flex flex-col">
      <HomeTopBar />
      <CreatePost />
      {posts
        ? posts.map((post: any) =>
            post ? <PostCard key={post.id} data={post} /> : ""
          )
        : ""}
      {sample_data
        ? sample_data.map((post: any) =>
            post ? <PostCard key={post.id} data={post} /> : ""
          )
        : ""}
    </div>
  );
};

const sample_data = [
  {
    id: "cm34dnyh80000ylokb1yk8jtr",
    imageUrl: null,
    content: "Hi Guru",
    author: {
      id: "cm2zy3f4l00008wxrdi7rraq6",
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKCqp5nISXDwXuniNpdrBBydwuVNablP3k8c3MfKMjTI58dJ8Y=s96-c",
      firstName: "dev",
      lastName: null,
    },
  },
];

export default Home;
