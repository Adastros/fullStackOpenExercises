const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const logger = require("../utils/logger.js");

// middleware to get token from authorization header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  // if true, create a token property in request with the token id
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }

  next();
};

// middleware to get user associated with blog
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response
      .status(401)
      .json({ error: "no token provided or authorization header invalid" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  request.user = await User.findById(decodedToken.id);

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
