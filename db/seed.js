const Transaction = require("./models/Transaction");
const db = require("./index");

//seeding data

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all([
      Transaction.create({ payer: "DANNON", points: 300 }),
      Transaction.create({ payer: "UNILEVER", points: 200 }),
      Transaction.create({ payer: "DANNON", points: -200 }),
      Transaction.create({
        payer: "MILLER COORS",
        points: 10000,
      }),
      Transaction.create({ payer: "DANNON", points: 1000 }),
    ]);
    console.log("Database has been setup");
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { syncAndSeed };
