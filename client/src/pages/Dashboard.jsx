import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";

const DashBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar />
      <Welcome />
    </div>
  );
};

export default DashBoard;
