import React from "react";

import Header from "../components/Header";
import HomeNav from "../components/HomeNav";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <HomeNav />
      <Header />
    </div>
  );
};

export default Home;
