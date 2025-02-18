// routes/auth.js
const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
});
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({resultType:"success", message: "User already exists",token });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({resultType:"success", message: "User registered successfully",token });
  } catch (error) {
    console.error(error);
    res.status(500).json({resultType:"error", message: "Server error",token });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ resultType:"fail",message: "Invalid credentials",token });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(200).json({resultType:"fail", message: "Invalid credentials",token });
    }

    
    res.status(200).json({resultType:"success", message: "Login successful", token });
  } catch (error) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    console.error(error);
    res.status(500).json({resultType:"fail", message: "Server error",token });
  }
});

module.exports = router;
