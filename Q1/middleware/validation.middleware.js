const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { CATEGORY_ENUM } = require("../models/keyword.model");
const { AppError } = require("../core/error.core");

async function validateLogin(req, res, next) {
  const inputSchema = Joi.object({
    username: Joi
      .string()
      .min(5)
      .max(15)
      .required(),
    password: Joi
      .string()
      .min(5)
      .max(15)
      .required(),
  });

  try {
    await inputSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return next(new AppError(400, "INPUT001", false, err.message));
  }

  return next();
}

async function validateUserList(req, res, next) {
  const inputSchema = Joi.object({
    username: Joi
      .string()
      .min(5)
      .max(15)
      .optional(),
    page: Joi
      .number()
      .integer()
      .min(1)
      .required(),
    limit: Joi
      .number()
      .integer()
      .min(1)
      .max(100)
      .required(),
  });

  try {
    await inputSchema.validateAsync(req.query, {
      abortEarly: false,
    });
  } catch (err) {
    return next(new AppError(400, "INPUT001", false, err.message));
  }

  return next();
}

async function validateUserId(req, res, next) {
  const inputSchema = Joi.object({
    userId: Joi
      .objectId()
      .required(),
  });

  try {
    await inputSchema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    return next(new AppError(400, "INPUT001", false, err.message));
  }

  return next();
}

async function validateSearchRepos(req, res, next) {
  const inputSchema = Joi.object({
    category: Joi
      .string()
      .valid(...Object.values(CATEGORY_ENUM))
      .required(),
    query: Joi
      .string()
      .required(),
  });

  try {
    await inputSchema.validateAsync(req.query, {
      abortEarly: false,
    });
  } catch (err) {
    return next(new AppError(400, "INPUT001", false, err.message));
  }

  return next();
}

async function validateReport(req, res, next) {
  const inputSchema = Joi.object({
    startDate: Joi
      .date()
      .required(),
    endDate: Joi
      .date()
      .required(),
    userId: Joi
      .objectId()
      .optional(),
    category: Joi
      .string()
      .valid(...Object.values(CATEGORY_ENUM))
      .optional(),
    type: Joi
      .string()
      .valid("month", "day", "week")
      .required(),
  });

  try {
    await inputSchema.validateAsync(req.query, {
      abortEarly: false,
    });
  } catch (err) {
    return next(new AppError(400, "INPUT001", false, err.message));
  }

  return next();
}

module.exports = {
  validateLogin,
  validateUserList,
  validateUserId,
  validateSearchRepos,
  validateReport,
};
