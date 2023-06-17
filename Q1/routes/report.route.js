const express = require("express");
const asyncHandler = require("express-async-handler");
const reportController = require("../controllers/report.controller");
const { validateReport } = require("../middleware/validation.middleware");
const { authenticateUser, checkIsAdmin } = require("../middleware/auth.middleware");

const reportRouter = express.Router();
reportRouter.use(authenticateUser);
reportRouter.use(checkIsAdmin);
reportRouter.get("/", validateReport, asyncHandler(reportController.getReport));

module.exports = reportRouter;
