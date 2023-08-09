// user-service.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(bodyParser.json());

const users = [];

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`User microservice listening on port ${port}`);
});
