import React from "react";
import heroPerson from "../../assets/hero-person.webp";

const Hero = () => {
  return (
    <>
      {/* Mobile Layout - hidden on desktop */}
      <div className="md:hidden grid grid-cols-2 grid-rows-8 h-screen w-full overflow-hidden gap-2 ">
        {/* Top bar */}
        <div className="h-[30%] row-start-1 row-end-2 col-start-1 col-end-3 self-end bg-gray-300"></div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-3 m-3 bg-gray-300 rounded-xl"></div>

        <div className="row-start-3 row-end-4 col-start-1 col-end-2 bg-red-600 h-12 w-4/5 m-3 rounded-xl "></div>
        <div className="row-start-3 row-end-8 col-start-1 col-end-3 m-3 bg-gray-300 mobile-clip-path rounded-xl"></div>
        <div className="row-start-7 row-end-8 justify-self-end self-end m-3 col-start-2 col-end-3 bg-black h-12 w-4/5 rounded-xl"></div>

        <div className="col-start-1 col-end-3 m-3 row-start-8 row-end-9 rounded-xl bg-gray-300 "></div>
      </div>
      {/* desktop layout */}
      <div
        id="home"
        className="hidden md:grid md:pt-[10%] lg:pt-0 grid-cols-14 gap-1 grid-rows-3 h-screen w-full "
      >
        <div className="row-start-2 ml-[3vw] justify-center flex flex-col row-end-3 col-start-1 col-end-5 ">
          <h1 className=" font-bold text-[2.9vw] ">THRILLVILLE</h1> 
          <br />
          <h1 className=" font-bold text-[2.9vw] ">ENTERTAINMENT</h1>
          <br />
          <h1 className=" font-bold text-[2.9vw] ">ZONE</h1>
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-8 ml-[3vw] relative clip-path2 bg-blue-700 mt-10 "></div>
        <div className="col-start-5 col-end-12 clip-path row-start-1 row-span-3 bg-red-600 relative overflow-hidden">
          <img src={heroPerson} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="row-start-2 row-end-3 col-start-10 gap-2 col-end-15 z-10 justify-evenly flex items-center ">
          <div className="h-full w-[50%] ml-2 bg-amber-500 rounded-xl "></div>
          <div className="h-full w-[50%] mr-2 bg-amber-500 rounded-xl "></div>
        </div>
      </div>
    </>
  );
};

export default Hero;
