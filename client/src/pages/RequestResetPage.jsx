import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";

const RequestResetPage = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // const onSubmitEmail = async (e) => {
  //   e.preventDefault();

  //   if (!email.trim()) {
  //     toast.error("Please enter a valid email address.");
  //     return;
  //   }

  //   navigate("/verify-otp", { state: { email } });

  //   try {

  //     axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
  //   } catch (error) {

  //     toast.error(error.response?.data?.message || "Something went wrong!");
  //   }
  // };

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    // Check if the email is empty or invalid
    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      // First, check if the email exists in the database
      const response = await axios.post(`${backendUrl}/api/auth/check-email`, {
        email,
      });

      if (response.data.exists) {
        // If the email exists, navigate to the OTP page
        navigate("/verify-otp", { state: { email } });
      } else {
        // If the email does not exist, show an error message
        toast.error("This email is not registered.");
      }
    } catch (error) {
      // Handle errors
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      // Reset loading state after the request is complete
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <form
        onSubmit={onSubmitEmail}
        className="bg-slate-900 p-8 rounded-lg w-96"
      >
        <h1 className="text-white text-2xl font-semibold text-center">
          Reset Password
        </h1>
        <p className="text-white text-center mt-2">Enter your email</p>

        <div className="flex bg-[#333A5C] mt-4 px-5 py-2.5 rounded-full">
          <img src={assets.mail_icon} alt="Mail" className="w-5 h-5" />
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent outline-none w-full text-white pl-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2.5 rounded-full bg-indigo-600 text-white transition-opacity duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RequestResetPage;
