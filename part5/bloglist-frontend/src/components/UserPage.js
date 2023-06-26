import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import Togglable from "./Togglable";

const UserPage = ({ setUser, setMessage, clearNotification, user }) => {
  UserPage.propTypes = {
    setUser: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogList();
  }, []);

  const getBlogList = () => {
    blogService.getAll().then((blogs) => {
      // Sort Blogs by likes
      blogs.sort((a, b) => b.likes - a.likes);

      setBlogs(blogs);
    });
  };

  const incrementLikes = async (id, likes) => {
    try {
      const updatedBlog = await blogService.update(id, { likes: likes + 1 });

      if (!updatedBlog) {
        throw new Error(`Blog likes was not updated successfully.`);
      }

      // If update successful, refresh bloglist on frontend
      if (updatedBlog.likes === likes + 1) {
        getBlogList();
        setMessage(`Likes was updated successfully`);
        clearNotification();
      } else {
        throw new Error(
          `Updated like count is ${updatedBlog.likes}. Should be ${likes + 1}.`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${blog.title} by ${blog.author}`
      )
    ) {
      await blogService.deleteBlog(blog.id);

      getBlogList();
      setMessage(`${blog.title} by ${blog.author} was deleted successfully`);
      clearNotification();
    }
  };

  const createNewBlog = async (newBlogInfo) => {
    blogService.create(newBlogInfo).then((newBlog) => {
      const blogInfo = {
        ...newBlog,
        user: {
          username: user.username,
          name: user.name,
          id: newBlog.user,
        },
      };

      setBlogs(blogs.concat(blogInfo));
      setMessage(`Successfully created new blog "${newBlog.title}"`);
      clearNotification();
    });
  };

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    setUser(null);
    setMessage(`Successfully logged out`);
    clearNotification();
  };

  return (
    <div>
      <div>
        <h2>{user.username} logged in</h2>
      </div>
      <Togglable buttonLabel="Create a New Blog">
        <BlogForm createNewBlog={createNewBlog} />
      </Togglable>
      <BlogList
        incrementLikes={incrementLikes}
        deleteBlog={deleteBlog}
        blogs={blogs}
      />
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default UserPage;
