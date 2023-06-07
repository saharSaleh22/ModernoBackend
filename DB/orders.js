const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  quantity: Number,
  image: String,
  title: String,
  price: Number,
  description: String,
  confirm: Number,
});

module.exports = mongoose.model("orders", userSchema);
