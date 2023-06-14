const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    _id: "647c457dc0fae709f7aea2ce",
    title: "Hello",
    author: "World",
    url: "https://helloworld.com/",
    likes: 9000,
    user: {},
    __v: 0,
  },
  {
    _id: "647c4590c0fae709f7aea2d0",
    title: "Run",
    author: "Walk",
    url: "https://lift.com/",
    likes: 5689,
    user: {},
    __v: 0,
  },
];

const initialUsers = [
  {
    username: "Funman",
    name: "David Jeff",
    password: process.env.TEST_PASSWORD1,
  },
  {
    username: "Hello",
    name: "Linda Laura",
    password: process.env.TEST_PASSWORD2,
  },
];

const newBlogs = {
  validBlog: {
    title: "Catch",
    author: "Me",
    url: "https://ifyoucan.com/",
    likes: 6,
  },
  blogNoLikes: { title: "Rabbit", author: "Frog", url: "https://turtle.com/" },
  blogNoAuthor: {
    title: "Author",

    url: "https://missing.com/",
    likes: 45,
  },
  blogNoTitle: {
    author: "Title",
    url: "https://titlemissing.com/",
    likes: 0,
  },
};

// generalized to get data based on provided schema
// returns an array of all documents with schema
const documentsInDb = async (schema) => {
  const data = await schema.find({});
  return data.map((datum) => datum.toJSON());
};

// Created to return a promise of completed hash.
// Trying to "await bcrypt.hash(password, 10)" directly makes the linter
// throw a warning about await not have an effect on expression. This
// helper function helps return the promise and remove the warning.
// Can potentially do "await new Promise(...)" as well.
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  initialBlogs,
  initialUsers,
  newBlogs,
  documentsInDb,
  hashPassword,
};
