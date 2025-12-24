import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@flavortown.com";
const ADMIN_PASSWORD = "admin123";

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

/* ================= REGISTER (CUSTOMER ONLY) ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      password: hashedPassword,
      role: "customer",
    });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

/* ================= LOGIN (ADMIN + CUSTOMER) ================= */
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    /* ===== HARDCODED ADMIN LOGIN ===== */
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const fakeAdmin = {
        _id: "admin-id",
        role: "admin",
        name: "Admin",
        email: ADMIN_EMAIL,
      };

      return res.json({
        token: jwt.sign(
          { id: fakeAdmin._id, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        ),
        user: fakeAdmin,
      });
    }

    /* ===== NORMAL USER LOGIN ===== */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};
