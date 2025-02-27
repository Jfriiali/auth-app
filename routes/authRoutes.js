const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const users = [];     

const JWT_SECRET = "your_secret_key";    

//  ثبت‌نام کاربر
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

//  ورود کاربر و دریافت توکن
router.post("/login", async (req, res) => {
  console.log("Login route hit!");
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //  تولید `JWT`
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "User logged in successfully", token });
});

//  خروج کاربر (فقط توکن رو در کلاینت حذف کن)
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

//  مسیر محافظت‌شده برای تست توکن
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

//  Middleware برای بررسی توکن
function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = router;
