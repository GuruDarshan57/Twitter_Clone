import React from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuRepeat2 } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { MdBookmarkBorder } from "react-icons/md";
import { RiShare2Fill } from "react-icons/ri";

const FeedCard = () => {
  return (
    <div className="w-full flex p-2 pr-4 border-b-2 border-gray-800 text-gray-200 tracking-wide hover:bg-gray-950">
      <div className="w-32 flex justify-center items-start">
        <Image
          className="rounded-full h-fit cursor-pointer"
          src={"/assets/user_img.webp"}
          height={35}
          width={35}
          alt="Profile Photo"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold cursor-pointer hover:underline">
              GuruDarshan
            </span>
            <span className="text-xs text-gray-300 cursor-pointer">
              @guru573116 .{" "}
            </span>
            <span className="text-xs text-gray-300 cursor-pointer hover:underline">
              1 Oct
            </span>
          </div>
          <div className="text-lg text-gray-300 cursor-pointer hover:bg-blue-950 p-1 rounded-xl">
            <IoIosMore />
          </div>
        </div>
        <div className="flex text-justify text-sm cursor-pointer">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          modi earum sunt repellendus laudantium cupiditate aliquid aliquam
          asperiores ex architecto!
        </div>
        <div className="flex w-full py-4 cursor-pointer">
          <Image
            className="w-full rounded-xl"
            src="/assets/post_img.jpeg"
            alt="Post Image"
            height={600}
            width={400}
          />
        </div>
        <div className="flex my-1 justify-between text-xl text-gray-500">
          <div className="flex flex-1 justify-between relative -left-2">
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer">
              <IoChatbubbleOutline />
              <span className="text-sm">201</span>
            </span>
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-green-700 p-1 px-2 rounded-full cursor-pointer">
              <LuRepeat2 />
              <span className="text-sm">19</span>
            </span>
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 hover:text-red-700 p-1 px-2 rounded-full cursor-pointer">
              <IoMdHeartEmpty />
              <span className="text-sm">256</span>
            </span>
            <span className="flex gap-2 items-center text-lg hover:bg-gray-900 p-1 hover:text-blue-500 px-2 rounded-full cursor-pointer">
              <BiSolidBarChartAlt2 />
              <span className="text-sm">19k</span>
            </span>
            <span className="flex text-lg">
              <span className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer">
                <MdBookmarkBorder />
              </span>
            </span>
          </div>
          <span className="hover:bg-gray-900 hover:text-blue-500 p-1 px-2 rounded-full cursor-pointer text-lg">
            <RiShare2Fill />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
