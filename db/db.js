const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/fetch_points",
  { logging: false }
);

module.exports = db;
