// import React from "react";
// import Navbar from "../components/Navbar";
// import Welcome from "../components/Welcome";

// const DashBoard = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
//       <Navbar />
//       <Welcome />
//     </div>
//   );
// };

// export default DashBoard;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";

const DashBoard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch or page load delay
    setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 500); // You can adjust the delay as needed (simulating 2 seconds for example)
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-50">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
      <Navbar />
      <Welcome />
    </div>
  );
};

export default DashBoard;
