import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getuserData } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/data", userAuth, getuserData);

export default userRoutes;
   