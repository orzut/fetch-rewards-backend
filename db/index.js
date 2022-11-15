const Sequelize = require("sequelize");
const databaseName = "fetch_points";
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`
);

module.exports = db;
