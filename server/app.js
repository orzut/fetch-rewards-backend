const express = require("express");
const app = express();
const { User, Transaction } = require("../db");

app.use(express.json());

app.post("/api/points", async (req, res, next) => {
  try {
    res.status(201).send(await Transaction.create(req.body));
  } catch (ex) {
    console.log(ex);
  }
});

app.put("/api/points", async (req, res, next) => {
  try {
    res.send(req.user.redeemPoints(req.body));
  } catch (ex) {
    console.log(ex);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
