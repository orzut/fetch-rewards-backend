const app = require("./app");
const { syncAndSeed } = require("../db/seed");

const port = process.env.PORT || 3000;

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
