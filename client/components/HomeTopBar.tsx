import React from "react";

const HomeTopBar = () => {
  return (
    <div className="w-full flex border-slate-700 border-b-[0.5px] cursor-pointer sticky top-0 z-10 glass_bg">
      <div className="flex-1 flex justify-center items-center hover:bg-gray-900">
        <button className="p-2 pt-5 text-sm font-semibold tracking-wide self-end">
          For you
          <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-2"></div>
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center hover:bg-gray-900">
        <button className="p-2 pt-5  text-sm font-semibold tracking-wide text-slate-500 self-end">
          Following
          <div className="h-1 w-full bg-sky-500 rounded-full relative -bottom-2 invisible"></div>
        </button>
      </div>
    </div>
  );
};

export default HomeTopBar;
