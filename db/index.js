const Sequelize = require("sequelize");
const db = require("./db");
const Transaction = require("./models/Transaction");

module.exports = { db, Transaction };
