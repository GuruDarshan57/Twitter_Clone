import React from "react";
import Letfbar from "./Leftbar";
import MobileNavbar from "./MobileNavbar";
import RightBar from "./RightBar";

const X3Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="w-full h-full px-0 lg:px-8 xl:px-14 2xl:px-28 grid grid-cols-10">
      <div className="h-full hidden mobile:inline mobile:col-span-2">
        <Letfbar />
      </div>
      <div className="flex flex-col col-span-10 mobile:col-span-8 sm:col-span-7 lg:col-span-5 w-full h-screen max-h-screen overflow-y-scroll hidescrollbar border-slate-700 border-r-[0.5px] border-l-[0.5px] relative">
        {children}
        <div className="mobile:hidden w-full">
          <MobileNavbar />
        </div>
      </div>
      <div className="h-full hidden lg:inline lg:col-span-3">
        <RightBar />
      </div>
    </div>
  );
};

export default X3Layout;
