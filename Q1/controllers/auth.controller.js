const jwt = require("jsonwebtoken");
const { addMinutes } = require("date-fns");
const { createHmac } = require("crypto");
const { UserModel } = require("../models/user.model");
const { AppError } = require("../core/error.core");

function hashPassword(inputPassword) {
  const hash = createHmac("sha256", process.env.HASH_SECRET);
  hash.update(inputPassword);
  return hash.digest("hex");
}

function signJWT(inputData) {
  const exp = addMinutes(new Date(), 60).getTime();
  const token = jwt.sign(
    {
      ...inputData,
      exp,
    },
    process.env.JWT_SECRET,
  );
  return token;
}

async function login(req, res) {
  const { username, password } = req.body;
  const hashedPassword = hashPassword(password);
  const existingUser = await UserModel.findOne({ username, password: hashedPassword });
  if (!existingUser) {
    throw new AppError(401, "AUTH001", true, "INVALID CREDENTIALS");
  }
  if (!existingUser.isApproved) {
    throw new AppError(401, "AUTH001", true, "NOT YET APPROVED");
  }
  req.session.userId = existingUser._id.toString();
  console.log(req.session);
  const token = signJWT({ id: existingUser._id.toString() });
  return res.send({ token });
}

async function register(req, res) {
  // check user exists
  const { username, password } = req.body;
  const existingUser = await UserModel.countDocuments({ username });
  if (existingUser) {
    throw new AppError(400, "AUTH002");
  }
  const hashedPassword = hashPassword(password);
  const newUser = new UserModel({
    username,
    password: hashedPassword,
  });
  await newUser.save();
  return res.send("SUCCESS");
}

async function logout(req, res) {
  // destroy the session
  req.session.destroy();
  res.send("SUCCESS");
}

module.exports = {
  login,
  register,
  logout,
};
