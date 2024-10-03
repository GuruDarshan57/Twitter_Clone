import Tweet from "@components/Tweet";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="col-span-5 w-full h-screen max-h-screen border-r-[0.5px] border-l-[0.5px] border-slate-700 overflow-y-scroll hidescrollbar">
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
};

export default Home;
