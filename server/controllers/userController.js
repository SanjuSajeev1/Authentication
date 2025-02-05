import userModel from "../models/userModel.js";

export const getuserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return { succes: false, message: "user not found" };
    }
    res.json({
      success: true,
      userdata: {
        name: user.name,
        isAccountverified: user.isAccountverified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
