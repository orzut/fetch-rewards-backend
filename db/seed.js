const User = require("./models/User");
const Transaction = require("./models/Transaction");
const db = require("./db");

//seeding data

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const user = await User.create({ username: "user1", password: "password" });
    await Promise.all([
      Transaction.create({ payer: "DANNON", points: 300, userId: user.id }),
      Transaction.create({ payer: "UNILEVER", points: 200, userId: user.id }),
      Transaction.create({ payer: "DANNON", points: -200, userId: user.id }),
      Transaction.create({
        payer: "MILLER COORS",
        points: 10000,
        userId: user.id,
      }),
      Transaction.create({ payer: "DANNON", points: 1000, userId: user.id }),
    ]);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
