const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const db = require("../db");
const { UUID, UUIDV4, STRING } = Sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.define("user", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = User;

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "User does not exist!";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

User.prototype.spendPoints = async function ({ points }) {
  const sortedTransactions = await db.models.transaction.findAll({
    order: [["createdAt", "ASC"]],
  });
  let remainder = points;

  for (const row of sortedTransactions) {
    let transaction = await db.models.transaction.findOne({
      where: { id: row.id },
    });
    if (remainder === 0) {
      break;
    } else if (transaction.points === 0) {
      continue;
    } else if (remainder < transaction.points) {
      transaction.points = transaction.points - remainder;
      transaction.spentPoints = -remainder;
      remainder = 0;
      await transaction.save();
    } else {
      remainder = remainder - transaction.points;
      transaction.spentPoints = -transaction.points;
      transaction.points = 0;
      await transaction.save();
    }
  }
  const groupedByPayer = await db.models.transaction.findAll({
    where: {
      spentPoints: { [Op.ne]: 0 },
    },
    attributes: [
      "payer",
      [Sequelize.fn("sum", Sequelize.col("spentPoints")), "spentPoints"],
    ],
    group: ["payer"],
    raw: true,
  });
  return groupedByPayer;
};

User.prototype.totalPoints = async function () {
  return await db.models.transaction.findAll({
    attributes: [
      "payer",
      [Sequelize.fn("sum", Sequelize.col("points")), "points"],
    ],
    group: ["payer"],
    raw: true,
  });
};
