import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Register User
const registerUser = async (req, res) => {
  const { username, cnic, email, password } = req.body;

  if (!email || !password || !username || !cnic) {
    return res.status(400).json({ message: "Fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const newUser = await User.create({
      username,
      cnic,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        cnic: newUser.cnic,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateAccessToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get All Users

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "Users get successfully", users });
  } catch (error) {
    console.error("Error in getAllUser:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User get successfully", user });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

//Logout user
const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  try {
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ message: "Invalid token" });
    }

    const newAccessToken = generateAccessToken(user);
    res
      .status(200)
      .json({ message: "Access token generated", accessToken: newAccessToken });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res
      .status(500)
      .json({ message: "Error refreshing token", error: error.message });
  }
};

// JWT Token Generators
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "6h",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
};

export {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  logoutUser,
  refreshToken,
};
