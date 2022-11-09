const Sequelize = require("sequelize");
const db = require("../db");
const { UUID, UUIDV4, STRING } = Sequelize;

const User = db.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
