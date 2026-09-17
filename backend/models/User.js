const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  password: String,
  contact:Number,
  role: { type: String,
  enum: ["farmer", "merchant"] }
});

module.exports = mongoose.model("User", userSchema);
