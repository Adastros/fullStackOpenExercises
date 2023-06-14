const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const logger = require("../utils/logger.js");

// Add new user
usersRouter.post("/", async (request, response) => {
  if (request.body.password === undefined) {
    logger("No password provided with request");
    response.status(400).end();
    return;
  } else if (request.body.password.length < 3) {
    logger("Password must be longer than 3 characters");
    response.status(400).end();
    return;
  }

  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  logger.info("successfully added new user");
  response.status(201).json(savedUser);
});

// Get all users in database
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  response.json(users);
});

module.exports = usersRouter;
