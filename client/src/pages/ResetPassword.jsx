// import React, { useState, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContent } from "../context/AppContext";

// const ResetPasswordPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";
//   const otp = location.state?.otp || "";
//   const [pass, setPass] = useState("");

//   const { backendUrl } = useContext(AppContent);

//   const onResetPassword = async (e) => {
//     e.preventDefault();

//     if (!email || !otp) {
//       return toast.error("Missing email or OTP. Please retry.");
//     }

//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/auth/reset-password`,
//         {
//           email,
//           otp,
//           newPassword: pass,
//         }
//       );

//       if (data.success) {
//         toast.success("Password reset successful! Redirecting...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Password reset failed!");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
//       <form
//         onSubmit={onResetPassword}
//         className="bg-slate-900 p-8 rounded-lg w-96"
//       >
//         <h1 className="text-white text-2xl font-semibold text-center">
//           New Password
//         </h1>
//         <p className="text-white text-center mt-2">Enter your new password</p>
//         <div className="flex bg-[#333A5C] mt-4 px-5 py-2.5 rounded-full">
//           <input
//             type="password"
//             placeholder="New password"
//             className="bg-transparent outline-none w-full text-white pl-3"
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full mt-4 py-2.5 rounded-full bg-indigo-600 text-white"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;

import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";
  const [pass, setPass] = useState("");

  const { backendUrl } = useContext(AppContent);

  useEffect(() => {
    if (!otp) {
      navigate("/", { replace: true });
      toast.error("Use forgot passsword to acces this page");
    }
  }, [otp, navigate]);

  const onResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      return toast.error("Missing email or OTP. Please retry.");
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword: pass,
        }
      );

      if (data.success) {
        toast.success("Password reset successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <form
        onSubmit={onResetPassword}
        className="bg-slate-900 p-8 rounded-lg w-96"
      >
        <h1 className="text-white text-2xl font-semibold text-center">
          New Password
        </h1>
        <p className="text-white text-center mt-2">Enter your new password</p>
        <div className="flex bg-[#333A5C] mt-4 px-5 py-2.5 rounded-full">
          <input
            type="password"
            placeholder="New password"
            className="bg-transparent outline-none w-full text-white pl-3"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2.5 rounded-full bg-indigo-600 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
