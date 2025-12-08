import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex z-10 fixed top-0 left-0 right-0 justify-between p-8 text-xl">
        <div className="flex gap-4">
          <p>Activities</p>
          <p>About Us</p>
          <p>Offers %</p>
        </div>
        <div className="flex gap-4">
          <p>Contact Us</p>
          <p>User</p>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden flex h-[10%] sticky top-0 left-0 right-0 z-10 justify-between items-center px-[4%] py-[6%]">
        <div className="flex gap-2 items-center justify-center">
          <div className="text-2xl bg-gray-300 p-2 rounded-lg"><FaUserAlt /></div>
          <div className="text-xl  bg-gray-300 py-1 px-4 rounded-lg flex items-center">Username</div>
        </div>
        <div className="text-3xl bg-gray-300 p-1 rounded-lg"><IoMenu  /></div>
      </div>
    </>
  );
};

export default Navbar;
