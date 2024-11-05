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
      {/* {posts
        ? posts.map((post: any) =>
            post ? <PostCard key={post.id} data={post} /> : ""
          )
        : ""} */}
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
    content: "",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKCqp5nISXDwXuniNpdrBBydwuVNablP3k8c3MfKMjTI58dJ8Y=s96-c",
      firstName: "dev",
      lastName: null,
    },
  },
  {
    id: "cm34diavw0000k2mym36ag6az",
    imageUrl: null,
    content: "Grind Hard",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKCqp5nISXDwXuniNpdrBBydwuVNablP3k8c3MfKMjTI58dJ8Y=s96-c",
      firstName: "dev",
      lastName: null,
    },
  },
  {
    id: "cm34dav7t0001upti3iqd100q",
    imageUrl: null,
    content: "Oh God!",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKCqp5nISXDwXuniNpdrBBydwuVNablP3k8c3MfKMjTI58dJ8Y=s96-c",
      firstName: "dev",
      lastName: null,
    },
  },
  {
    id: "cm34cn5il0000upti7aob6ixh",
    imageUrl:
      "https://images.unsplash.com/photo-1726682577615-728e4272a60c?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Damm car",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocLvRAah-87WFO2DgvLapXpFOWw98hQx7Xsi9uojdaZGsss1i2n4=s96-c",
      firstName: "Guru",
      lastName: "Darshan",
    },
  },
  {
    id: "cm347c58g0000126ml9qoc0oy",
    imageUrl: null,
    content: "Really Sad",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocKCqp5nISXDwXuniNpdrBBydwuVNablP3k8c3MfKMjTI58dJ8Y=s96-c",
      firstName: "dev",
      lastName: null,
    },
  },
  {
    id: "cm33xa6n70000z4yjbjpim9u1",
    imageUrl: null,
    content: "long way to go",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocLvRAah-87WFO2DgvLapXpFOWw98hQx7Xsi9uojdaZGsss1i2n4=s96-c",
      firstName: "Guru",
      lastName: "Darshan",
    },
  },
  {
    id: "cm32vd6ge0004z22s9k7ftaqw",
    imageUrl:
      "https://images.pexels.com/photos/28268121/pexels-photo-28268121/free-photo-of-an-old-black-and-white-photo-of-the-ruins.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    content: "hello world!",
    author: {
      profileImgUrl:
        "https://lh3.googleusercontent.com/a/ACg8ocLvRAah-87WFO2DgvLapXpFOWw98hQx7Xsi9uojdaZGsss1i2n4=s96-c",
      firstName: "Guru",
      lastName: "Darshan",
    },
  },
];

export default Home;
