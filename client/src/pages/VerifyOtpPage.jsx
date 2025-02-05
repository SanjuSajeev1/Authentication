import React, { useRef, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
      toast.error("Go to reset page and submit your email");
    }
  }, [email, navigate]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const onVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    console.log("OTP:", otpValue);
    console.log("Email:", email);

    if (otpValue.length !== 5) {
      return toast.error("OTP must be 5 digits.");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-reset-otp`,
        {
          email,
          otp: otpValue,
        }
      );

      console.log("API Response:", data);

      if (data.success) {
        toast.success("OTP Verified!");
        navigate("/reset-pass", { state: { email, otp: otpValue } });
      } else {
        toast.error(data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      console.error("Error Headers:", error.response?.headers);
      toast.error(error.response?.data?.message || "OTP verification failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <form onSubmit={onVerifyOtp} className="bg-slate-900 p-8 rounded-lg w-96">
        <h1 className="text-white text-2xl font-semibold text-center">
          Verify OTP
        </h1>
        <p className="text-white text-center mt-2">
          Enter the 5-digit code sent to your email
        </p>
        <div className="flex justify-between mt-5">
          {otp.map((_, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
              ref={(el) => (inputRef.current[index] = el)}
              value={otp[index]}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-5 py-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
