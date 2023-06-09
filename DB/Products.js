const mongoose = require("mongoose");

const products = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  color: String,
  image: String,
  type: String,
  like: Number,
});

module.exports = mongoose.model("products", products);
