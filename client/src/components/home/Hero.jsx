import React from "react";

const Hero = () => {
  return (
    <div className="h-screen flex w-full">
      <div className="h-full w-[28%] flex justify-between items-center flex-col">
        <div className=""></div>
        <div className="mt-40 text-[2.5em] font-bold">
          THRILLVILLE <br /> ENTERTAINMENT <br /> ZONE
        </div>
        <div className="ml-80 pt-10 clip-path2 h-[26%] w-[150%] bg-gray-400"></div>
      </div>
      <div className="h-full bg-gray-300 clip-path overflow-hidden w-[56%] rounded-4xl flex justify-center items-center"></div>
      <div className="h-full w-[20%] absolute right-5 flex justify-center gap-4 items-center">
        <div className="h-[20%] w-[50%] bg-red-600 rounded-xl"></div>
        <div className="h-[20%] w-[50%] bg-black rounded-xl"></div>
      </div>
    </div>
  );
};

export default Hero;
