import express from "express";
import {
  getAllUser,
  getUserById,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/getallusers", getAllUser);

router.get("/singleuser/:id", getUserById);

router.get("/refreshtoken", refreshToken);

export default router;