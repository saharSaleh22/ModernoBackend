const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  number: String,
  address: String,
});

module.exports = mongoose.model("users", userSchema);
