import { useState } from "react";
import BlogLikes from "./BlogLikes";

const Blog = ({ incrementLikes, deleteBlog, blog }) => {
  const [hide, setHide] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const blogTitleStyle = { margin: "0.5rem 0" };

  const hideBlogStyle = {
    display: hide ? "none" : "",
  };

  // const deleteButtonStyle = {
  //   marginTop: "0.5rem",
  // };

  const onToggleBlogView = () => setHide(!hide);

  const onBlogDelete = () => {
    deleteBlog(blog);
  };

  const buttonText = () => (hide ? "View" : "Hide");

  const deleteButtonStyle = () => {
    let style = {
      marginTop: "0.5rem",
      display: "none",
    };

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser.username === blog.user.username) {
      style["display"] = "";
    }

    return style;
  };

  return (
    <div style={blogStyle}>
      <div>
        <div style={blogHeaderStyle}>
          <h3 style={blogTitleStyle}>{`${blog.title} by ${blog.author}`}</h3>
          <button onClick={onToggleBlogView}>{buttonText()}</button>
        </div>
        <div className={"togglable"} style={hideBlogStyle}>
          <div>{blog.url}</div>
          <BlogLikes
            incrementLikes={incrementLikes}
            title={blog.title}
            id={blog.id}
            likes={blog.likes}
          />
          <div>{`Added by: ${blog.user.username}`}</div>
          <button style={deleteButtonStyle()} onClick={onBlogDelete}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
