const express = require("express");
const asyncHandler = require("express-async-handler");
const { authenticateUser, checkUserLoggedIn } = require("../middleware/auth.middleware");
const { validateUserList, validateUserId } = require("../middleware/validation.middleware");
const {
  getUsers,
  approveUser,
  rejectUser,
  suspendUser,
  deleteUser,
  unsuspendUser,
} = require("../controllers/admin.controller");

const adminRouter = express.Router();

adminRouter.use(authenticateUser);
adminRouter.use(checkUserLoggedIn);

// get list of articles
adminRouter.get("/users", validateUserList, asyncHandler(getUsers));

adminRouter.post(
  "/approveRegistration",
  validateUserId,
  asyncHandler(approveUser),
);
adminRouter.post(
  "/rejectRegistration",
  validateUserId,
  asyncHandler(rejectUser),
);
adminRouter.post("/suspendUser", validateUserId, asyncHandler(suspendUser));
adminRouter.post("/unsuspendUser", validateUserId, asyncHandler(unsuspendUser));
adminRouter.post("/deleteUser", validateUserId, asyncHandler(deleteUser));

module.exports = adminRouter;
