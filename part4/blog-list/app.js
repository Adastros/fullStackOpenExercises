const config = require("./utils/config.js");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blog.js");
const usersRouter = require("./controllers/user.js");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger.js");
const mongoose = require("mongoose");
const morgan = require("morgan");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
// used by both blog and user routes
app.use(middleware.tokenExtractor);

// Routes
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

// If testing, make the /reset route available to
// clear all users and blogs from test database
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing.js");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
