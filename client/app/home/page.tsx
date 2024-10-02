import FeedCard from "@components/FeedCard";
import React from "react";

const Home = () => {
  return (
    <div className="col-span-5 w-full h-screen max-h-screen border-r-[0.5px] border-l-[0.5px] border-slate-700 overflow-y-scroll hidescrollbar">
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};

export default Home;
