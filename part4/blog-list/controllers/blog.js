const blogRouter = require("express").Router();
const middleware = require("../utils/middleware.js");
const Blog = require("../models/blog.js");
const logger = require("../utils/logger.js");

// Get all blog documents
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1, id: 1 })
    .exec();

  response.json(blogs);

  // Without async/await
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs);
  // });
});

// Create new blog document
blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  if (request.body.title === undefined || request.body.author === undefined) {
    return response.status(400).end();
  }

  // Get extracted user
  const user = request.user;

  // create new Blog document
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0, // if likes property missing, default value is 0
    user: user.id,
  });

  // save blog to database
  const result = await blog.save();

  // save the id of the new blog to the user and save user with blog id to database
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  logger.info(
    `Successfully created blog ${blog.title} for user ${user.username}`
  );
  response.status(201).json(result);

  // Without async/await
  // blog
  //   .save()
  //   .then((result) => {
  //     logger.info("success");
  //     response.status(201).json(result);
  //   })
  //   .catch((error) => next(error));
});

// delete a blog document. Only the user that created the blog can delete it
blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    // Get extracted user
    const user = request.user;

    // find the blog that should be deleted
    const blogToDeleteInUser = user.blogs.find(
      (blog) => blog.toString() === request.params.id
    );

    // determine if the blog is associated with user before deleting the blog
    if (!blogToDeleteInUser) {
      return response
        .status(400)
        .json({ error: "blog not associated with user" });
    }

    // attempt to delete blog from database; returns deleted blog document
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id);

    // If deletion failed, return error message
    if (!deletedBlog) {
      return response.status(400).json({
        error: `Blog "${deletedBlog.title}" doesn't exist in database`,
      });
    }

    // If deletion successful, delete the blog info from user
    user.blogs = user.blogs.filter(
      (blog) => blog.id.toString() !== request.params.id.toString()
    );

    // Save the updated User info to database
    await user.save();

    logger.info(
      `Blog "${deletedBlog.title}" successfully deleted from username "${user.username}"`
    );
    response.status(204).end();
  }
);

// Update an existing blog document
blogRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true }
  );

  response.json(updatedBlog);
});

module.exports = blogRouter;
