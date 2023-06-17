const express = require("express");
const asyncHandler = require("express-async-handler");
const authController = require("../controllers/auth.controller");
const { validateLogin } = require("../middleware/validation.middleware");
const { authenticateUser, checkUserLoggedIn } = require("../middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/login", validateLogin, asyncHandler(authController.login));

authRouter.post(
  "/register",
  validateLogin,
  asyncHandler(authController.register),
);

authRouter.post(
  "/logout",
  authenticateUser,
  checkUserLoggedIn,
  asyncHandler(authController.logout),
);

module.exports = authRouter;
