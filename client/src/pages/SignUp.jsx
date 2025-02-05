import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSignupHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        password: pass,
      });

      if (data.success) {
        setIsLoggedIn(true);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

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
          Create Account
        </h2>
        <p className="text-center text-sm mb-6">Create your account</p>

        <form onSubmit={onSignupHandler}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="Person" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>

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

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer underline"
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
