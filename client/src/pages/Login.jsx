// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContent } from "../context/AppContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedIn, getUserData, loading } =
//     useContext(AppContent);

//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");

//   const onLoginHandler = async (e) => {
//     e.preventDefault();
//     axios.defaults.withCredentials = true;

//     try {
//       const { data } = await axios.post(backendUrl + "/api/auth/login", {
//         email,
//         password: pass,
//       });

//       if (data.success) {
//         setIsLoggedIn(true);
//         await getUserData();
//         navigate("/dashboard", { replace: true });
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
//         <div className="text-white text-2xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 relative">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt="Logo"
//         className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
//       />
//       <div className="bg-slate-900 p-10 rounded-lg w-full sm:w-96 text-indigo-300 text-small">
//         <h2 className="text-center text-3xl font-semibold text-white mb-3">
//           Login
//         </h2>
//         <p className="text-center text-sm mb-6">Login to your account</p>

//         <form onSubmit={onLoginHandler}>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="Email" />
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="outline-none"
//               type="email"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="Lock" />
//             <input
//               onChange={(e) => setPass(e.target.value)}
//               value={pass}
//               className="outline-none"
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <p
//             onClick={() => navigate("/request-reset")}
//             className="mb-4 text-indigo-500 cursor-pointer"
//           >
//             Forgot password?
//           </p>

//           <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
//             Login
//           </button>
//         </form>

//         <p className="text-gray-400 text-center text-xs mt-4">
//           Don't have an account?
//           <span
//             onClick={() => navigate("/signup")}
//             className="cursor-pointer underline"
//           >
//             Sign Up Here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData, loading } =
    useContext(AppContent);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Function to prevent backward navigation
  const preventBack = () => {
    window.history.pushState(null, null, window.location.href);
  };

  useEffect(() => {
    preventBack(); // Apply initially
    window.addEventListener("popstate", preventBack); // Reapply when back button is clicked

    return () => {
      window.removeEventListener("popstate", preventBack);
    };
  }, []);

  const onLoginHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/login", {
        email,
        password: pass,
      });

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        navigate("/dashboard", { replace: true });

        // Apply the prevention logic again after navigating
        setTimeout(() => preventBack(), 100);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 relative">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg w-full sm:w-96 text-indigo-300 text-small">
        <h2 className="text-center text-3xl font-semibold text-white mb-3">
          Login
        </h2>
        <p className="text-center text-sm mb-6">Login to your account</p>

        <form onSubmit={onLoginHandler}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Email" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock" />
            <input
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              className="outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/request-reset")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="cursor-pointer underline"
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
