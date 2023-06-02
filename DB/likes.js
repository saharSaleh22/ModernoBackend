const mongoose = require("mongoose");

const likes = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  color: String,
  image: String,
  email:String,
  type: String,
});

module.exports = mongoose.model("likes", likes);
