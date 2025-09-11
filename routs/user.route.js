import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";
import { supabase } from "../lib/supabase.js";
import { handleUserRegistration } from "../DAL/users.DAL.js";

const router = express.Router();


// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email} = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password are required" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await handleUserRegistration({ username, hashedPassword, email});

    if (result.status === "exists") {
      return res.status(400).json({ error: "Username already exists" });
    }

    res.status(201).json({ message: "User created successfully", user: result.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password are required" });

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .limit(1);

    if (error || data.length === 0)
      return res.status(404).json({ error: "User not found, please sign up" });

    const user = data[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign(
      { userId: user.id, username: user.username ,role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure:false,
      })
      .status(200)
      .json({ message: "Login successful", username: user.username, role:user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
