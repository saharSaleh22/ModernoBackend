const mongoose = require("mongoose");

const products = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  email:String,
  mobile:String,
  address:String,
  rating:Number,
});

module.exports = mongoose.model("userproducts", products);
