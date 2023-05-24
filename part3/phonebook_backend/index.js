// Back End Code
// Connects to MONGODB database. Can interact with front end code in "Build" folder
require("dotenv").config(); // dependency used to simplify REACT env variables; must be imported before the Person model so env variables can be used
const express = require("express");
const app = express();
const Person = require("./models/person"); // Mongoose Model
const morgan = require("morgan");

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

// Middleware
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        // if person with ID doesn't exist
        console.log(`Person with ID ${request.params.id} does not exist`);
        response.status(404).end();
      }
    })
    .catch((error) => next(error)); // if findById method is rejected
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(`<p>Phonebook has info for ${count}</p> <p>${new Date()}`);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((deletedPerson) => {
      if (deletedPerson.name) {
        console.log(`${deletedPerson.name} was successfully deleted`);
        response.status(204).end();
      } else {
        // requested person wasn't actually deleted
        console.log(`Person with ID ${request.params.id} failed to be deleted`);
        response.status(404).end();
      }
    })
    .catch((error) => next(error)); //findByIdAndRemove rejected
});

// Add a new person
app.post("/api/persons/", (request, response, next) => {
  const body = request.body,
    newPerson = new Person({
      name: body.name,
      number: body.number,
    });

  newPerson
    .save()
    .then(() => {
      console.log(
        `${newPerson.name} with number ${newPerson.number} successfully added to phonebook`
      );
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Update number of existing person
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { number: body.number },
    { new: true, runValidators: true }
  )
    .then((updatedPerson) => {
      if (updatedPerson.number) {
        console.log(
          `${updatedPerson.name}'s number updated to ${updatedPerson.number}`
        );
        response.json(updatedPerson);
      } else {
        console.log(`${body.name}'s number unsuccessfully updated`);
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware - handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || process.env.LOCAL_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
