const router = require("express").Router();

module.exports = router;
const { User, Transaction } = require("../../db");
const { isLoggedIn } = require("./middleware");

router.put("/spend-points", isLoggedIn, async (req, res, next) => {
  try {
    res.send(req.user.spendPoints(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.post("/points", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await Transaction.create(req.body));
  } catch (ex) {
    next(ex);
  }
});
