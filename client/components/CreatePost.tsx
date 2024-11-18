import React, { useCallback, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { PiImage } from "react-icons/pi";
import { HiOutlineGif } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useGetCurrentUserDetails } from "@hooks/user";
import Image from "next/image";
import { useCreatePost } from "@hooks/post";
import toast from "react-hot-toast";
import { graphqlClient } from "@clients/api";
import { GetSignedURLQuery } from "@graphql/query/posts";
import axios from "axios";

const CreatePost = () => {
  const { user } = useGetCurrentUserDetails();
  const [content, setContent] = useState("");
  const { mutate } = useCreatePost();
  const [imagePath, setImagePath] = useState("");

  const handleCreatePost = useCallback(() => {
    if (content.length < 2) return toast.error("Please enter some text");
    if (content.length > 280)
      return toast.error("Please enter less than 280 characters");
    mutate({ content: content, imageUrl: imagePath });
    setContent("");
    setImagePath("");
  }, [mutate, content]);

  const handleImageInputChange = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);

      if (file) {
        toast.loading("Uploading Image", { id: "uploadImage" });

        const imageName = file.name;
        const imageType = file.type.split("/")[1];
        const { getSignedURL } = await graphqlClient.request(
          GetSignedURLQuery,
          { imageName, imageType }
        );
        await axios.put(getSignedURL || "", file, {
          headers: { "Content-Type": imageType },
        });
        const UploadURL = new URL(getSignedURL || "");
        const imageURL = UploadURL.origin + UploadURL.pathname;
        setImagePath(imageURL);
        toast.success("Uplaoaded ✅", { id: "uploadImage" });
      }
    };
  }, []);

  const handleImageInput = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    const handleChange = handleImageInputChange(input);

    input.addEventListener("change", handleChange);
  }, []);
  return (
    <div className="w-full border-slate-700 border-b-[0.5px] cursor-pointer">
      <div className="flex p-2 pb-0 gap-3">
        <div className="">
          {user && user.profileImgUrl ? (
            <Image
              src={user.profileImgUrl}
              alt="profile"
              width={100}
              height={100}
              className="w-10 h-10 object-contain rounded-full"
            />
          ) : (
            <span className="text-4xl">
              <PiUserCircleThin />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col px-1">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            rows={2}
            placeholder={"What's happening ?"}
            className="bg-black tracking-wide p-1 border-slate-700 border-b-[0.5px] outline-none"
          ></textarea>
          {imagePath ? (
            <div className="flex w-full justify-center pr-2 py-4 cursor-pointer">
              <Image
                className="w-fit h-48 md:h-72 object-contain rounded-xl border-[0.5px] border-slate-600"
                src={imagePath}
                alt="Post Image"
                height={600}
                width={400}
                placeholder="blur"
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAgAAMcAw7Dm+8MAAAAASUVORK5CYII="
              />
            </div>
          ) : (
            ""
          )}
          <div className="w-full flex justify-between items-center p-1 py-2 pb-3">
            <div className="text-sky-400 text-xl flex gap-4">
              <PiImage onClick={handleImageInput} />
              <HiOutlineGif className="cursor-not-allowed text-sky-700" />
              <HiOutlineChartBar className="cursor-not-allowed text-sky-700" />
              <HiOutlineEmojiHappy className="cursor-not-allowed text-sky-700" />
              <HiMiniCalendarDays className="cursor-not-allowed text-sky-700" />
              <HiOutlineLocationMarker className="cursor-not-allowed text-sky-700" />
            </div>
            <button
              className="bg-sky-600 font-bold p-1 px-4 tracking-wider hover:bg-sky-700 rounded-full"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
