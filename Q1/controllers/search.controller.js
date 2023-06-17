const { KeywordModel } = require("../models/keyword.model");
const { listRepos } = require("../core/git.core");

async function searchRepos(req, res) {
  const {
    query,
    category,
  } = req.query;
  const keyWords = query.split(" ");
  const docArray = keyWords.map((keyword) => ({
    keyword,
    category,
    user: req.user._id,
  }));

  await KeywordModel.insertMany(docArray);

  const data = await listRepos(query, category);
  res.send(data);
}

module.exports = {
  searchRepos,
};
