"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useGetAllPosts } from "@hooks/post";
import PostCard from "@components/PostCard";
import HomeTopBar from "@components/HomeTopBar";
import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";

const Home: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const { posts = [] } = useGetAllPosts();

  useEffect(() => {
    setLoader(posts ? false : true);
  }, []);
  return (
    <>
      <HomeTopBar />
      <div className="w-full h-full max-h-full overflow-y-scroll hidescrollbar flex flex-col">
        <CreatePost />
        {posts ? (
          posts.map((post: any) =>
            post ? <PostCard key={post.id} data={post} /> : ""
          )
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            No Posts
          </div>
        )}

        {loader ? <Loader /> : ""}
      </div>
    </>
  );
};

export default Home;
