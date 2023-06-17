const Joi = require("joi");
const { AppError } = require("../core/error.core");

async function validateLogin(req, res, next) {
  const inputSchema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(5).max(15).required(),
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

module.exports = {
  validateLogin,
};
