// Mongoose specific code for backend
// Connects to MongoDB and sets the 'Person' schema
// Exports the Person model
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const numberRegex = /^\d{2,3}-\d{4,}$/m;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "must be at least 3 characters long"],
    required: [true, "is required"],
  },
  number: {
    type: String,
    minLength: [8, "must be at least 8 characters long"],
    required: [true, "is required"],
    validate: [numberRegex, "{VALUE} is an invalid number"],
  },
});

// Removed _id and __v fields from models with this schema
personSchema.set("toJSON", {
  versionKey: false,
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString(); // transform to str to avoid errors in testing
    delete returnedObj._id;
  },
});

module.exports = mongoose.model("person", personSchema);
