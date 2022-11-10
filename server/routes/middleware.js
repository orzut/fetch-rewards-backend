const { User } = require("../../db");

const isLoggedIn = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.authorization;
  if (!token) {
    return res.status(403).send("A token is required");
  }
  try {
    req.user = await User.findByToken(token);
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = { isLoggedIn };
