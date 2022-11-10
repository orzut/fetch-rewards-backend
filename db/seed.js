const User = require("./models/User");
const Transaction = require("./models/Transaction");
const db = require("./db");

//seeding data

const syncAndSeed = async () => {
  try {
    await db.sync({ force: false });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
