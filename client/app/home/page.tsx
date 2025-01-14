"use client";
import React, { useEffect, useState } from "react";
import PostCard from "@components/PostCard";
import CreatePost from "@components/CreatePost";
import Loader from "@components/Loader";
import X3Layout from "@components/X3Layout";
import { useRouter } from "next/navigation";
import { useGetCurrentUserDetails } from "@hooks/user";
import { useGetAllPosts } from "@hooks/post";
import Image from "@node_modules/next/image";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { BsStars } from "react-icons/bs";
import EditProfilePopup from "@components/EditProfilePopup";

const Home: React.FC = () => {
  const { user } = useGetCurrentUserDetails();
  const [loader, setLoader] = useState(true);
  const queryClient = useQueryClient();
  const [showMore, setShowMore] = useState(false);
  const { posts = [] } = useGetAllPosts();
  const router = useRouter();
  const [editProfilePopup, setEditProfilePopup] = useState(false);

  useEffect(() => {
    setLoader(posts ? false : true);
    !user ? router.push("/") : "";
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("X_token");
    toast.success("Logged Out Successfully");
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
    window.location.replace("/");
  };
  return (
    <X3Layout
      children={
        <>
          <div className="w-full h-full max-h-full overflow-y-scroll hidescrollbar flex flex-col">
            <div className="w-full p-4 pl-2.5  flex justify-between items-center border-gray-800 border-b-[0.5px] sticky top-0 glass_bg z-20">
              <div className="flex gap-3 items-center">
                {" "}
                <div className="w-12 sm:hidden ">
                  {user?.profileImgUrl ? (
                    <>
                      <Image
                        onClick={() => {
                          setShowMore(!showMore);
                        }}
                        className="w-10 h-10 object-contain rounded-full relative cursor-pointer"
                        src={user?.profileImgUrl}
                        height={100}
                        width={100}
                        alt="Profile Photo"
                        placeholder="empty"
                      />
                      {showMore ? (
                        <div className="border-2 border-gray-700 bg-black flex flex-col gap-1 p-1.5 px-2 absolute left-2 -bottom-16 rounded-lg z-10">
                          <div
                            className=""
                            onClick={() => router.push(`/user/${user?.id}`)}
                          >
                            Profile
                          </div>
                          <div className="" onClick={handleLogOut}>
                            Log Out
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="font-bold tracking-wide text-xl">Home</div>
              </div>
              <div
                className="p-2.5 hover:bg-gray-900 rounded-full cursor-pointer"
                onClick={() => setEditProfilePopup(!editProfilePopup)}
              >
                <BsStars className="text-xl text-blue-400 " />
              </div>
            </div>
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
            {editProfilePopup ? (
              <EditProfilePopup setEditProfilePopup={setEditProfilePopup} />
            ) : (
              ""
            )}
          </div>
        </>
      }
    />
  );
};

export default Home;
