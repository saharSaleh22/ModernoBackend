const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/user");
const Products = require("./DB/Products");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});
app.post("/addproduct", async (req, res) => {
  let pro = new Products(req.body);
  let resultP = await pro.save();
  res.send(resultP);
});

app.get("/products", async (req, res) => {
  const product = await Products.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send("No products found");
  }
});
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findById(productId);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
app.listen(3006);
