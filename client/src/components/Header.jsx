import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContent);

  console.log("User Data now:", userData?.name);

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800 font-medium mb-2">
      <img
        src={assets.header_img}
        alt="User Avatar"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl">
        Hey, Developer !
        <img className="w-8 aspect-square" src={assets.bat} alt="Wave" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome User!!!!!!
      </h2>
      <p className="mb-8 max-w-md">
        Login to our app and get started with amazing features!
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
