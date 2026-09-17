const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// =============================
// 🤖 FREE CHATBOT ROUTE (NO AI / NO API)
// =============================
app.post("/api/chat", (req, res) => {
  console.log("Chat API hit");
  console.log(req.body);

  const { message } = req.body;
  if(!message){
    return res.json({reply:"Please type something :)"});
  }
  const text = message.toLowerCase();

  let reply = "Please ask about crops, buying, selling or orders 🌾";

  if (text.includes("buy") || text.includes("crop") || text.includes("market")) {
    reply = "Go to marketplace to buy crops 🌾";
  } 
  else if (text.includes("sell")) {
    reply = "Go to sell page and list your crops 🧺";
  } 
  else if (text.includes("order")) {
    reply = "Here are your orders 📦";
  } 
  else if (text.includes("login")) {
    reply = "Please login first 🔐";
  } 
  else if (text.includes("fertilizer")) {
    reply = "Use organic compost or NPK depending on crop 🌱";
  } 
  else if (text.includes("price")) {
    reply = "Crop prices change daily. Check marketplace 📊";
  } 
  else if (text.includes("hello") || text.includes("hi")) {
    reply = "Hello 👋 I am your Agri Assistant. How can I help?";
  }

  res.json({ reply });
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});