const Sequelize = require("sequelize");
const db = require("../index");
const { STRING, UUID, UUIDV4, INTEGER, VIRTUAL } = Sequelize;

const Transaction = db.define("transaction", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  payer: {
    type: STRING,
    allowNull: false,
  },
  points: {
    type: INTEGER,
    allowNull: false,
  },
  spentPoints: {
    type: INTEGER,
    defaultValue: 0,
  },
});

Transaction.totalPoints = async function () {
  return await Transaction.findAll({
    attributes: [
      [Sequelize.fn("sum", Sequelize.col("points")), "total_points"],
    ],
  });
};

module.exports = Transaction;
