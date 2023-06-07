const express = require("express");
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");

const cors = require("cors");
require("./DB/config");
const User = require("./DB/user");
const Products = require("./DB/Products");
const Likes = require("./DB/likes");
const UserProducts = require("./DB/UserProducts");
const Order = require("./DB/orders");
const likes = require("./DB/likes");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.put("/signup/:userIdentifier", async (req, res) => {
  const { userIdentifier } = req.params;
  const { address, number } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userIdentifier}, // Use the appropriate field to match the user (e.g., _id, email, username)
      { address, number },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("error.message");
  }
});
app.put("/userproducts/:userIdentifier", async (req, res) => {
  const { userIdentifier } = req.params;
  const { address, mobile } = req.body;

  try {
    const updatedUser = await UserProducts.findOneAndUpdate(
      { email: userIdentifier}, // Use the appropriate field to match the user (e.g., _id, email, username)
      { address, mobile},
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("error.message");
  }
});
app.put("/products/:userIdentifier", async (req, res) => {
  const { userIdentifier } = req.params;
  const { like } = req.body;

  try {
    const updatedUser = await Products.findOneAndUpdate(
      { _id: userIdentifier}, // Use the appropriate field to match the user (e.g., _id, email, username)
      { like},
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/signup/:userIdentifier", async (req, res) => {
  const { userIdentifier } = req.params;

  try {
    const user = await User.findOne({ email: userIdentifier });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/addproduct", async (req, res) => {
  let pro = new Products(req.body);
  let resultP = await pro.save();
  res.send(resultP);
});
app.post("/likes", async (req, res) => {
  let pro = new Likes(req.body);
  let resultP = await pro.save();
  res.send(resultP);
});
app.post("/adduserproduct", async (req, res) => {
  let pro = new UserProducts(req.body);
  let resultP = await pro.save();
  res.send(resultP);
});
app.post("/order", async (req, res) => {
  let order = new Order(req.body);
  let resultO = await order.save();
  res.send(resultO);
});
app.put("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { confirm: 1 },
      { new: true }
    );

    res.send(updatedOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if the provided ID is valid
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    // Check if the order exists
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.delete("/likes/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if the provided ID is valid
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    // Find and delete the order
    const deletedOrder = await likes.findByIdAndDelete(orderId);

    // Check if the order exists
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/products", async (req, res) => {
  const product = await Products.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send("No products found");
  }
});
app.get("/likes", async (req, res) => {
  const product = await Likes.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send("No products found");
  }
});
app.get("/userproducts", async (req, res) => {
  const product = await UserProducts.find();
  if (product.length > 0) {
    res.send(product);
  } else {
    res.send("No products found");
  }
});
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  if (orders.length > 0) {
    res.send(orders);
  } else {
    res.send("No orders found");
  }
});
app.get("/users", async (req, res) => {
  const user = await User.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send("No users found");
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
app.get("/userproducts/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await UserProducts.findById(productId);

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
