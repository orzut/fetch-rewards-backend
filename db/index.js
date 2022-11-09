const Sequelize = require("sequelize");
const db = require("./db");
const User = require("./models/User");
const Transaction = require("./models/Transaction");

//associations
Transaction.belongsTo(User, {
  foreignKey: { name: "userId", allowNull: false },
});

module.exports = { db, User, Transaction };
