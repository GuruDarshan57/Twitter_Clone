"use client";
import React, { useCallback } from "react";
import { useGetAllPosts } from "@hooks/post";
import PostCard from "@components/PostCard";
import HomeTopBar from "@components/HomeTopBar";
import CreatePost from "@components/CreatePost";

const Home: React.FC = () => {
  const { posts = [] } = useGetAllPosts();

  return (
    <div className="col-span-5 w-full h-screen max-h-screen border-slate-700 border-r-[0.5px] border-l-[0.5px]  overflow-y-scroll hidescrollbar">
      <HomeTopBar />
      <CreatePost />
      {posts
        ? posts.map((post: any) =>
            post ? <PostCard key={post.id} data={post} /> : ""
          )
        : ""}
    </div>
  );
};

export default Home;
