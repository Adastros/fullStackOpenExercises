import { useState } from "react";

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onCreateNewBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    createNewBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const onUrlChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={onCreateNewBlog}>
        <div>
          <p>Title:</p>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Blog Title"
            onChange={onTitleChange}
            required
          ></input>
        </div>
        <div>
          <p>Author:</p>
          <input
            type="text"
            value={author}
            name="author"
            placeholder="Blog Author"
            onChange={onAuthorChange}
            required
          ></input>
        </div>
        <div>
          <p>Blog Link (URL):</p>
          <input
            type="text"
            value={url}
            name="url"
            placeholder="Blog Website Link"
            onChange={onUrlChange}
            required
          ></input>
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
