const router = require("express").Router();
const { User } = require("../../db");
const { isLoggedIn } = require("./middleware");
const jwt = require("jsonwebtoken");

module.exports = router;

router.post("/login", async (req, res, next) => {
  res.send({ token: await User.authenticate(req.body) });
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});
