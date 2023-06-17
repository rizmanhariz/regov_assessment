const { AppError } = require("../core/error.core");
const { UserModel } = require("../models/user.model");

function checkSecret(req, res, next) {
  if (req.header("auth_secret") !== process.env.AUTH_SECRET) {
    throw new AppError(400, "AUTH001");
  }

  next();
}

function checkIsAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    throw new AppError(400, "AUTH001", true, "NOT ADMIN");
  }
  next();
}

async function authenticateUser(req, res, next) {
  let user;
  // validate jwt

  if (req.session?.userId) {
    // token exists - attempt to validate
    try {
      user = await UserModel.findOne(
        { _id: req.session?.userId },
        { username: 1, isAdmin: 1 },
      );
    } catch (err) {
      next(new AppError(401, "AUTH001"));
    }

    req.user = user;
  }

  next();
}

function checkUserLoggedIn(req, res, next) {
  if (!req.user) {
    throw new AppError(401, "AUTH001");
  }
  next();
}

module.exports = {
  checkSecret,
  checkIsAdmin,
  authenticateUser,
  checkUserLoggedIn,
};
