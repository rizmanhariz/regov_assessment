const { UserModel } = require("../models/user.model");

async function getUsers(req, res) {
  const { page, limit, username } = req.query;
  const filter = {};
  if (username) {
    filter.username = {
      $regex: username,
      $options: "i",
    };
  }

  const userData = await UserModel.paginate(filter, {
    page,
    limit,
    projection: {
      username: 1,
      isAdmin: 1,
      isApproved: 1,
    },
  });

  res.send(userData);
}

module.exports = {
  getUsers,
};
