const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/fetch_points"
);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
