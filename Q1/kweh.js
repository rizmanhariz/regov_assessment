const { listRepos } = require("./core/git.core");
require("dotenv").config();

(async function () {
  await listRepos();
}());
