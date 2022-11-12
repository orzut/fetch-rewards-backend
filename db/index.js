const Sequelize = require("sequelize");
const databaseName = "fetch_points";
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/${databaseName}`
);

module.exports = db;
