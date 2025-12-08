import React from "react";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between p-8 text-xl">
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
  );
};

export default Navbar;
