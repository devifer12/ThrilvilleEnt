import React from "react";

const Hero = () => {
  return (
    <>
      {/* Desktop Layout - hidden on mobile */}
      <div className="hidden lg:flex h-screen w-full">
        {/* Left section with title */}
        <div className="h-full w-[28%] flex justify-between items-center flex-col">
          <div className=""></div>
          <div className="mt-40 text-[2.5em] font-bold">
            THRILLVILLE <br /> ENTERTAINMENT <br /> ZONE
          </div>
          <div className="ml-80 pt-10 clip-path2 h-[26%] w-[150%] bg-gray-300"></div>
        </div>

        {/* Center section with clip-path */}
        <div className="h-full bg-gray-300 clip-path overflow-hidden w-[56%] rounded-4xl flex justify-center items-center"></div>

        {/* Right section with cards */}
        <div className="h-full w-[20%] absolute right-5 flex justify-center gap-4 items-center">
          <div className="h-[20%] w-[50%] bg-red-600 rounded-xl"></div>
          <div className="h-[20%] w-[50%] bg-black rounded-xl"></div>
        </div>
      </div>

      {/* Mobile Layout - hidden on desktop */}
      <div className="lg:hidden flex flex-col h-[90%] w-full">
        {/* Top bar */}
        <div className="h-[5%] w-full bg-gray-300"></div>

        <div className="bg-gray-300 h-[20%] mx-[4%] mb-[4%] mt-[6%] rounded-xl"></div>

        <div className="h-[55%] ">
          <div className="absolute bg-red-300 h-[5.5%] w-[37.5%] mx-[4%] rounded-xl "></div>
          <div className="bg-gray-300 mobile-clip-path h-full mx-[4%] rounded-xl"></div>
          <div className="absolute right-0 bottom-32 bg-black h-[5.5%] w-[37.5%] mx-[4%] rounded-xl "></div>
        </div>

        <div className="h-[13%] mx-[4%] my-[4%] rounded-xl bg-gray-300 "></div>
      </div>
    </>
  );
};

export default Hero;
