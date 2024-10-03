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
          height={37}
          width={37}
          alt="Profile Photo"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold cursor-pointer hover:underline">
              GuruDarshan
            </span>
            <span className="text-sm text-gray-300 cursor-pointer">
              @guru573116 .{" "}
            </span>
            <span className="text-sm text-gray-300 cursor-pointer hover:underline">
              1 Oct
            </span>
          </div>
          <div className="text-xl text-gray-300 cursor-pointer hover:bg-blue-950 p-1 rounded-xl">
            <IoIosMore />
          </div>
        </div>
        <div className="flex text-justify text-base cursor-pointer">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          modi earum sunt repellendus laudantium cupiditate aliquid aliquam
          asperiores ex architecto!
        </div>
        <div className="flex w-full justify-center pr-2 py-4 cursor-pointer">
          <Image
            className="w-fit h-72 object-contain rounded-xl"
            src="https://images.unsplash.com/photo-1726682577615-728e4272a60c?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
