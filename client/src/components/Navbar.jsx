import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContent);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const SendOtpVerification = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.message);
        navigate("/email-verify");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <div>
        <img src={assets.naruto} alt="" className="w-28 sm:w-32" />
      </div>

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData?.name?.[0]?.toUpperCase()}

          <div className="w-25 absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className=" list-none m-0 p-2 bg-gray-100 cursor-pointer text-xs">
              {!userData.isAccountVerifed && (
                <li
                  onClick={SendOtpVerification}
                  className="py-1 px-1 hover:bg-gray-300  rounded-l cursor-pointer"
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-1 hover:bg-gray-300  rounded-l cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
