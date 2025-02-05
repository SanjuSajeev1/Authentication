// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import userModel from "../models/userModel.js";
// import dotenv from "dotenv";

// dotenv.config();

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//   }
//   return res.json({ succes: false, message: "Invalid credentials" });
// };

// try {
//   const existingUser = await userModel.findOne({ email });
//   if (existingUser) {
//     return res.json({ succes: false, message: "user already exist" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new userModel({ name, email, password: hashedPassword });
//   await user.save();

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// } catch (error) {
//   res.json({ succes: false, message: error.message });
// }

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       succes: false,
//       message: "Email and password are required",
//     });
//   }
//   try {
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ succes: false, message: "Invalid email" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ succes: false, message: "Invalid password" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ succes: true });
//   } catch (error) {
//     return res.json({
//       succes: false,
//       message: error.message,
//     });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie(
//       ("token",
//       token,
//       {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       })
//     );
//     res.json({ succes: true, message: "logged Out" });
//   } catch (error) {}
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import transporter from "../config/nodemailer.js";

dotenv.config();

// Register User
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send Welcome Mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account created!!",
      text: "Welcome! Your account has been created successfully.",
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send OTP for Email Verification
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    // Find the user by userId
    const user = await userModel.findById(userId);

    // Check if user exists
    // if (!user) {
    //   return res.json({ success: false, message: "User not found" });
    // }

    // Check if account is already verified
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    // Generate a random 5-digit OTP
    const otp = String(Math.floor(10000 + Math.random() * 90000));

    // Save OTP and expiry time in the user document
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Set up email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification OTP",
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Verify OTP and Activate Account
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing userId or OTP" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    // Check if OTP has expired
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    // Compare the OTP
    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // OTP is correct, verify the account
    user.isAccountVerified = true;
    user.verifyOtp = ""; // Clear OTP
    user.verifyOtpExpireAt = 0; // Clear OTP expiration time
    await user.save();

    res.json({ success: true, message: "Account successfully verified" });
  } catch (error) {
    const otp = String(Math.floor(10000 + Math.random() * 90000));

    // Save OTP and expiry time in the user document
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 24 hours
    await user.save();

    // Set up email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification OTP",
      text: `Your OTP is ${otp}`,
    };

    // Send OTP via email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.json({ success: true, message: "Verification OTP sent to email" });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ succes: true });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ succes: false, message: "Email required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ succes: false, message: "user not found" });
    }
    const otp = String(Math.floor(10000 + Math.random() * 90000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 24 hours
    await user.save();

    // Set up email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your OTP is ${otp}`,
    };

    // Send OTP via email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.json({ success: true, message: "Verification OTP sent to email" });
  } catch (error) {}
};

// export const verifyResetOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     // Find user by email
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Compare entered OTP with stored OTP
//     if (user.ResetOtp !== otp) {
//       return res.status(400).json({ success: false, message: "InvalidP" });
//     }

//     // OTP is valid, proceed with reset
//     return res.status(200).json({ success: true, message: "OTP verified" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

//reset pass

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.json({
//       success: false,
//       message: "Email, OTP, and new password are required",
//     });
//   }

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     if (user.resetOtp === "" || user.resetOtp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP2" });
//     }

//     if (user.resetOtpExpireAt < Date.now()) {
//       return res.json({ success: false, message: "OTP expired" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetOtp = "";
//     user.resetOtpExpireAt = 0;

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   console.log("Received request for password reset:", { email, otp });

//   if (!email || !otp || !newPassword) {
//     return res.json({
//       success: false,
//       message: "Email, OTP, and new password are required",
//     });
//   }

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       console.log("User not found for email:", email);
//       return res.json({ success: false, message: "User not found" });
//     }

//     if (user.resetOtp === "" || user.resetOtp !== otp) {
//       console.log("Invalid OTP:", otp, "Expected:", user.resetOtp);
//       return res.json({ success: false, message: "Invalid OTP2" });
//     }

//     if (user.resetOtpExpireAt < Date.now()) {
//       console.log("OTP expired for user:", email);
//       return res.json({ success: false, message: "OTP expired" });
//     }

//     console.log("Resetting password for:", email);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.resetOtp = "";
//     user.resetOtpExpireAt = 0;

//     await user.save();

//     console.log("Password reset successful for:", email);
//     return res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     return res.json({ success: false, message: error.message });
//   }
// };

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  console.log("📩 Received Reset Password Request:");
  console.log("➡️ Email:", email);
  console.log("🔢 OTP:", otp);
  console.log("🔒 New Password:", newPassword ? "Provided" : "Not Provided");

  if (!email || !otp || !newPassword) {
    console.log("❌ Missing Required Fields!");
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.json({ success: false, message: "User not found" });
    }

    console.log("✅ User found in DB:", user.email);
    console.log("🔎 Stored OTP:", user.resetOtp);
    console.log("⏳ OTP Expiry Time:", new Date(user.resetOtpExpireAt));

    if (!user.resetOtp || user.resetOtp !== otp) {
      console.log("❌ Invalid OTP:", otp, "Expected:", user.resetOtp);
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      console.log("❌ OTP Expired for:", email);
      return res.json({ success: false, message: "OTP expired" });
    }

    console.log("✅ Resetting password for:", email);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    console.log("✅ Password reset successful for:", email);
    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("❌ Error in resetPassword:", error);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

//verify reset otp

export const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    return res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.json({ success: false, message: error.message });
  }
};
