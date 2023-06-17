const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { sendErrorResponse } = require("./core/error.core");
const { connectMongoDB } = require("./core/db.core");
const logger = require("./core/log.core");

// define routers
const authRouter = require("./routes/auth.route");
const adminRouter = require("./routes/admin.route");
const searchRouter = require("./routes/search.route");

// get env variables
require("dotenv").config();

const PORT = process.env.PORT || 9000;
const app = express();
connectMongoDB();

// set up mongo connection

// handle cors & general security
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: parseInt(process.env.SESSION_LENGTH, 10) },
  resave: false,
}));

app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use(sendErrorResponse);

app.listen(PORT);
logger.info(`Server live on PORT: ${PORT}`);
