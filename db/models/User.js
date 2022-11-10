const Sequelize = require("sequelize");
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

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: user.id }, process.env.JWT);
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
  console.log(await db.models.transaction.findAll());
  return points;
};

User.prototype.totalPoints = async function () {
  console.log("total points ********************");

  console.log(db.models);
};
