const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "Email already registered. Please login.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ LOGIN (FINAL FIXED)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    // ✅ IMPORTANT: user object bhejna zaroori hai
    res.json({
      token,
      role: user.role,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;