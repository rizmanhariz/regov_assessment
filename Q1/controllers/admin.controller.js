const { AppError } = require("../core/error.core");
const { UserModel, REG_STATUS_ENUM } = require("../models/user.model");

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

async function approveUser(req, res) {
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: req.body.userId, registrationStatus: REG_STATUS_ENUM.PENDING },
    { registrationStatus: REG_STATUS_ENUM.APPROVED },
  );
  if (!updateUser) {
    throw new AppError(404, "INPUT002", false, "DID NOT FIND USER WITH PENDING REGISTRATION");
  }
  res.send("SUCCESS");
}

async function rejectUser(req, res) {
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: req.body.userId, registrationStatus: REG_STATUS_ENUM.PENDING },
    { registrationStatus: REG_STATUS_ENUM.REJECTED },
  );
  if (!updateUser) {
    throw new AppError(404, "INPUT002", false, "DID NOT FIND USER WITH PENDING REGISTRATION");
  }
  res.send("SUCCESS");
}

async function suspendUser(req, res) {
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: req.body.userId },
    { isSuspended: true },
  );
  if (!updateUser) {
    throw new AppError(404, "INPUT002", false, "DID NOT FIND USER");
  }
  res.send("SUCCESS");
}

async function unsuspendUser(req, res) {
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: req.body.userId },
    { isSuspended: false },
  );
  if (!updateUser) {
    throw new AppError(404, "INPUT002", false, "DID NOT FIND USER");
  }
  res.send("SUCCESS");
}

async function deleteUser(req, res) {
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: req.body.userId },
    { isDeleted: true },
  );
  if (!updateUser) {
    throw new AppError(404, "INPUT002", false, "DID NOT FIND USER");
  }
  res.send("SUCCESS");
}

module.exports = {
  getUsers,
  approveUser,
  rejectUser,
  suspendUser,
  unsuspendUser,
  deleteUser,
};
