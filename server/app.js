const express = require("express");
const app = express();

app.use(express.json());

app.use("/api", require("./routes/api"));
app.use("/auth", require("./routes/auth"));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
