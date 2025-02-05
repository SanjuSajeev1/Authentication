import React from "react";
import "./index.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import RequestResetPage from "./pages/RequestResetPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="email-verify" element={<EmailVerify />} />
        <Route path="reset-pass" element={<ResetPassword />} />
        <Route path="/request-reset" element={<RequestResetPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
