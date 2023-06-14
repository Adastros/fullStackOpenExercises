require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper.js");
const app = require("../app.js");
const api = supertest(app);
const Blog = require("../models/blog.js");
const User = require("../models/user.js");

// reinitializes mongodb testing database before running EACH of the tests below
beforeEach(async () => {
  // Remove all existing users and add initial users using set id of blogs
  await User.deleteMany({});
  await Promise.all(
    helper.initialUsers.map(async (initialUser, i) => {
      const passwordHash = await helper.hashPassword(initialUser.password);
      const newUser = new User({
        ...initialUser,
        passwordHash,
        blogs: helper.initialBlogs[i]["_id"],
      });

      await newUser.save();
    })
  );

  // Remove all existing blogs and add initial blogs using
  // ids of users
  await Blog.deleteMany({});

  const users = await helper.documentsInDb(User);
  const userIds = users.map((user) => user.id);

  await Promise.all(
    helper.initialBlogs.map(async (blog, i) => {
      const newBlog = new Blog({ ...blog, user: userIds[i] });
      await newBlog.save();
    })
  );

  // await Blog.insertMany(helper.initialBlogs);

  //   // create an array of Blog models
  //   const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  //   // create an array of promises to save each blog
  //   // saves are performed in parallel
  //   const promiseArray = blogObjects.map((blog) => blog.save());

  //   // wait for all promises to resolve before executing a test
  //   await Promise.all(promiseArray);
}, 10000);

describe("check initial blogs in database", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("returns number of blogs in initial testing database", async () => {
    const response = await helper.documentsInDb(Blog);

    expect(response).toHaveLength(2);
  }, 10000);

  test("all blogs unique id key is named '_id' by default", async () => {
    const response = await helper.documentsInDb(Blog);

    // check each blog document for id key
    for (let i = 0; i < response.length; i++) {
      expect(response[i]["id"]).toBeDefined();
    }
  }, 10000);
});

describe("check initial users in database", () => {
  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("returns number of users in initial testing database", async () => {
    const response = await helper.documentsInDb(User);

    expect(response).toHaveLength(2);
  }, 10000);

  test("all users unique id key is named '_id' by default", async () => {
    const response = await helper.documentsInDb(User);

    // check each user document for id key
    for (let i = 0; i < response.length; i++) {
      expect(response[i]["id"]).toBeDefined();
    }
  }, 10000);

  test("check if correct usernames added to database", async () => {
    const usersInDb = await helper.documentsInDb(User);
    // check if correct username added to database
    const usernames = usersInDb.map((u) => u.username);

    for (let i = 0; i < helper.initialUsers.length; i++) {
      expect(usernames).toContain(helper.initialUsers[i].username);
    }
  }, 10000);
});

describe("Add new user in db", () => {
  // beforeEach(async () => {
  //   await User.deleteMany({});

  //   const passwordHash = await bcrypt.hash("sekret", 10);
  //   const user = new User({ username: "root", passwordHash });

  //   await user.save();
  // });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.documentsInDb(User);

    const newUser = {
      username: "Testuser1",
      name: "First Last",
      password: process.env.TEST_PASSWORD3,
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // check if the database has grown by 1 with new user
    const usersAtEnd = await helper.documentsInDb(User);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    // check if correct info added to database
    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);

    const names = usersAtEnd.map((user) => user.name);
    expect(names).toContain(newUser.name);

    const passwordHashes = usersAtEnd.map((user) => user.passwordHash);
    expect(passwordHashes).toContain(newUser.passwordHash);
  }, 10000);

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.documentsInDb(User);

    const newUser = {
      username: "Funman",
      name: "Prince Ali",
      password: process.env.TEST_PASSWORD4,
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.documentsInDb(User);
    expect(usersAtEnd).toEqual(usersAtStart);
  }, 10000);
});

describe("Test user login", () => {
  test("Valid login request returns token", async () => {
    const userLogin = {
      username: "Funman",
      password: process.env.TEST_PASSWORD1,
    };

    const response = await api
      .post("/api/login/")
      .send(userLogin)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeTruthy();
  }, 10000);

  test("Invalid password with login request returns status 400", async () => {
    const userLogin = {
      username: "Funman",
      password: process.env.TEST_PASSWORD2,
    };

    const response = await api
      .post("/api/login/")
      .send(userLogin)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 10000);
});

describe("Adding blogs to database", () => {
  const loginHelper = async () => {
    const userLogin = {
      username: "Funman",
      password: process.env.TEST_PASSWORD1,
    };

    const loginResponse = await api.post("/api/login/").send(userLogin);

    return loginResponse.body.token;
  };

  test("an invalid token returns status 401", async () => {
    await api
      .post("/api/blogs/")
      .send(helper.newBlogs.validBlog)
      .set("Authorization", `Bearer `)
      .expect(401);
  });

  test("a valid blog can be added", async () => {
    // send valid blog and check response header
    await api
      .post("/api/blogs/")
      .send(helper.newBlogs.validBlog)
      .set("Authorization", `Bearer ${await loginHelper()}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // get blogs to check if the new blog was added
    const response = await helper.documentsInDb(Blog);

    // creates an array containing the title, author, url, and likes of
    // every blog returned by the API
    const titleContents = response.map((r) => r.title);
    const authorContents = response.map((r) => r.author);
    const urlContents = response.map((r) => r.url);
    const likesContents = response.map((r) => r.likes);

    // check if there if something was added
    expect(response).toHaveLength(helper.initialBlogs.length + 1);

    // check if the content of the new blog matches
    expect(titleContents).toContain("Catch");
    expect(authorContents).toContain("Me");
    expect(urlContents).toContain("https://ifyoucan.com/");
    expect(likesContents).toContain(6);
  }, 10000);

  test("blog request is missing 'likes' property, 'likes' property defaults to value zero", async () => {
    const blogNoLikes = helper.newBlogs.blogNoLikes;

    await api
      .post("/api/blogs/")
      .send(blogNoLikes)
      .set("Authorization", `Bearer ${await loginHelper()}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // get blogs to check if the new blog was added
    const response = await helper.documentsInDb(Blog);

    // Check the new Blog exists and grab the value of the "likes" property
    const newBlogLikes = response.map((r) => {
      if (
        r.title === blogNoLikes.title &&
        r.author === blogNoLikes.author &&
        r.url === blogNoLikes.url
      ) {
        return r.likes;
      }
    });

    // Check if likes defaults to 0
    expect(newBlogLikes).toContain(0);
  }, 10000);

  test("request missing 'title' property, response is 400 (bad request)", async () => {
    await api
      .post("/api/blogs/")
      .send(helper.newBlogs.blogNoTitle)
      .set("Authorization", `Bearer ${await loginHelper()}`)
      .expect(400);

    const response = await helper.documentsInDb(Blog);

    expect(response).toHaveLength(helper.initialBlogs.length);
  }, 10000);

  test("request missing 'author' property, response is 400 (bad request)", async () => {
    await api
      .post("/api/blogs/")
      .send(helper.newBlogs.blogNoAuthor)
      .set("Authorization", `Bearer ${await loginHelper()}`)
      .expect(400);

    const response = await helper.documentsInDb(Blog);

    expect(response).toHaveLength(helper.initialBlogs.length);
  }, 10000);
});

describe("deleting a blog from database", () => {
  test("delete blog with valid id", async () => {
    const userLogin = {
      username: "Hello",
      password: process.env.TEST_PASSWORD2,
    };

    const loginResponse = await api.post("/api/login/").send(userLogin);
    const token = loginResponse.body.token;

    // delete blog
    await api
      .delete("/api/blogs/647c4590c0fae709f7aea2d0")
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    // check if database has one less blog
    const response = await helper.documentsInDb(Blog);

    expect(response).toHaveLength(helper.initialBlogs.length - 1);

    // check if deleted blog exists in database
    const blogIds = response.map((r) => r.title);

    expect(blogIds).not.toContain("647c4590c0fae709f7aea2d0");
  }, 10000);
});

describe("Updating a blog from database", () => {
  test("Update blog with valid model scheme", async () => {
    const userLogin = {
      username: "Hello",
      password: process.env.TEST_PASSWORD2,
    };

    const loginResponse = await api.post("/api/login/").send(userLogin);
    const token = loginResponse.body.token;

    // Send updated blog
    const putResponse = await api
      .put("/api/blogs/647c4590c0fae709f7aea2d0")
      .send({ likes: 7895 })
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(putResponse.body.likes).toBe(7895);

    // check if number of blogs in database not changed
    const response = await helper.documentsInDb(Blog);

    expect(response).toHaveLength(helper.initialBlogs.length);

    // check if blog likes exists in database
    const blogLikes = response.map((r) => r.likes);

    expect(blogLikes).toContain(7895);
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
