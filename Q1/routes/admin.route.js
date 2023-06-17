const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticateUser, checkUserLoggedIn } = require("../middleware/auth.middleware");
const { validateUserList } = require("../middleware/validation.middleware");
const { getUsers } = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.use(authenticateUser);
adminRouter.use(checkUserLoggedIn);

// get list of articles
adminRouter.get("/users", validateUserList, asyncHandler(getUsers));

module.exports = adminRouter;
