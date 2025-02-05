// import { createContext, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContent = createContext();

// export const AppContextProvider = (props) => {

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isLoggedin, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState("");
// const [loading, setLoading] = useState(false);

//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`);
//       if (data.success) {
//         setUserData(data.userData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch user data");
//     }
//   };

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedIn,
//     userData,
//     setUserData,
//     getUserData,
//   };

//   return (
//     <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
//   );
// };

// USE THIS

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.succes) {
        setIsLoggedIn(true);
        await getUserData();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      console.log("User Data fetched:", data);
      if (data.success) {
        setUserData(data.userdata);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AppContent = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials = true;

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isLoggedin, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState("");
//   const [loading, setLoading] = useState(true);

//   const getAuthState = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
//       if (data.success) {
//         setIsLoggedIn(true);
//         getUserData();
//       }
//     } catch (error) {
//       console.error("Auth check failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`);
//       if (data.success) {
//         setUserData(data.userdata);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch user data");
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedIn,
//     userData,
//     setUserData,
//     getUserData,
//     loading,
//   };

//   return (
//     <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
//   );
// };
