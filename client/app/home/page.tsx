"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useGetAllPosts } from "@hooks/post";
import PostCard from "@components/PostCard";
import HomeTopBar from "@components/HomeTopBar";
import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import X3Layout from "@components/X3Layout";
import { useRouter } from "next/navigation";
import { useGetCurrentUserDetails } from "@hooks/user";

const Home: React.FC = () => {
  const { user } = useGetCurrentUserDetails();
  const [loader, setLoader] = useState(true);
  const { posts = [] } = useGetAllPosts();
  const router = useRouter();

  useEffect(() => {
    setLoader(posts ? false : true);
    !user ? router.push("/") : "";
  }, []);
  return (
    <X3Layout
      children={
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
      }
    />
  );
};

export default Home;
