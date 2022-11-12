const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = router;
const Transaction = require("../../db/models/Transaction");

router.post("/points", async (req, res, next) => {
  try {
    res.status(201).send(await Transaction.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.put("/points", async (req, res, next) => {
  try {
    const sortedTransactions = await Transaction.findAll({
      order: [["createdAt", "ASC"]],
    });
    let remainder = req.body.points;
    if (remainder < 0 || !Number.isInteger(remainder)) {
      throw new Error("Please enter positive integer value");
    }
    const { total_points } = (await Transaction.totalPoints())[0].dataValues;
    if (remainder > total_points) {
      throw new Error("Not enough points");
    }
    for (const row of sortedTransactions) {
      let transaction = await Transaction.findOne({
        where: { id: row.id },
      });
      if (remainder === 0) {
        break;
      } else if (transaction.points === 0) {
        continue;
      } else if (remainder < transaction.points) {
        transaction.spentPoints = -remainder;
        remainder = 0;
        await transaction.save();
      } else {
        remainder = remainder - transaction.points;
        transaction.spentPoints = -transaction.points;
        await transaction.save();
      }
    }
    const groupedByPayer = await Transaction.findAll({
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
    res.send(groupedByPayer);
  } catch (ex) {
    next(ex);
  }
});

router.get("/points", async (req, res, next) => {
  try {
    res.send(
      await Transaction.findAll({
        attributes: [
          "payer",
          [
            Sequelize.fn(
              "sum",
              Sequelize.where(
                Sequelize.col("points"),
                "+",
                Sequelize.col("spentPoints")
              )
            ),
            "total_balance",
          ],
        ],
        group: ["payer"],
        raw: true,
      })
    );
  } catch (ex) {
    next(ex);
  }
});
