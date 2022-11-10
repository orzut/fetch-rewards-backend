const Sequelize = require("sequelize");
const db = require("../db");
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize;

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
});

module.exports = Transaction;
