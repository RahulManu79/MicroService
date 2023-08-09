// order-service.js
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3002;

app.use(bodyParser.json());

const orders = [];

app.post("/orders", async (req, res) => {
  const newOrder = req.body;
  orders.push(newOrder);

  // Call the User Microservice to retrieve user details
  try {
    const userResponse = await axios.get("http://localhost:8080/users");
    const users = userResponse.data;
    const userId = newOrder.userId;
    const user = users.find((user) => user.id === userId);

    res.status(201).json({ ...newOrder, user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Order microservice listening on port ${port}`);
});
