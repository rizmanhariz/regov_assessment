const express = require("express");
const asyncHandler = require("express-async-handler");
const { searchRepos } = require("../controllers/search.controller");
const { validateSearchRepos } = require("../middleware/validation.middleware");
const { authenticateUser, checkUserLoggedIn } = require("../middleware/auth.middleware");

const searchRouter = express.Router();
searchRouter.use(authenticateUser);
searchRouter.use(checkUserLoggedIn);
searchRouter.get("/repo", validateSearchRepos, asyncHandler(searchRepos));

module.exports = searchRouter;
