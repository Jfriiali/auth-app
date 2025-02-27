require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//  Middleware
app.use(express.json()); 
app.use(cors());

//  اتصال به دیتابیس
connectDB()
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;

//  مسیرهای API
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);         ``  

//  مسیر پیش‌فرض
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

//  راه‌اندازی سرور
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
// فرانت اند
app.use(express.static("public"));

//  نمایش درخواست‌ها در کنسول
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
