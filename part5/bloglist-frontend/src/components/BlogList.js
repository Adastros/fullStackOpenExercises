import Blog from "./Blog";

const BlogList = ({ incrementLikes, deleteBlog, blogs }) => {
  const userBlogs = blogs.map((blog) => (
    <Blog
      key={blog.id}
      incrementLikes={incrementLikes}
      deleteBlog={deleteBlog}
      blog={blog}
    />
  ));

  return (
    <div>
      <h2>blogs</h2>
      {userBlogs}
    </div>
  );
};

export default BlogList;
