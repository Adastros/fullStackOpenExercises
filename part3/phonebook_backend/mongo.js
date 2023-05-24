// Back End Code for local/development testing on command line
// For exercise 3.12
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://dannydo286:${password}@testing.gtkz7fn.mongodb.net/phonebook_backend?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("person", personSchema);

const newPerson = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

const savePerson = () => {
  newPerson.save().then(() => {
    console.log(
      `add ${newPerson.name} number ${newPerson.number} to phonebook`
    );
    mongoose.connection.close();
  });
};

const getAllPeople = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

if (process.argv[3]) {
  savePerson();
} else {
  getAllPeople();
}
