const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs === 0 ? 0 : blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  let favBlog = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (favBlog.likes < blogs[i].likes) {
      favBlog = blogs[i];
    }
  }

  return Object.fromEntries(Object.entries(favBlog).slice(1, -1));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  let uniqueAuthors = [],
    topAuthor,
    topAuthorIdx,
    maxBlogCount;

  const authorAndBlogs = (authorName) => {
    return { author: authorName, blogs: 1 };
  };

  if (blogs.length === 1) {
    return authorAndBlogs(blogs[0].author);
  } else {
    // get all authors from blog
    let blogAuthors = blogs.map((blog) => blog.author);

    // filter for unique authors and count the blogs for the unique authors
    blogAuthors.forEach((authorName) => {
      let uniqueAuthorIdx = uniqueAuthors.findIndex(
        (e) => e.author === authorName
      );

      if (uniqueAuthorIdx >= 0) {
        uniqueAuthors[uniqueAuthorIdx].blogs += 1;
      } else {
        uniqueAuthors.push(authorAndBlogs(authorName));
      }
    });
  }

  // determine author with most blogs
  maxBlogCount = Math.max(...uniqueAuthors.map((author) => author.blogs));
  topAuthorIdx = uniqueAuthors.findIndex(
    (author) => author.blogs === maxBlogCount
  );
  topAuthor = uniqueAuthors[topAuthorIdx];

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }

  let uniqueAuthors = [],
    topAuthor,
    topAuthorIdx,
    maxLikes;

  const authorAndLikesObj = (authorName, authorLikes) => {
    return { author: authorName, likes: authorLikes };
  };

  if (blogs.length === 1) {
    return authorAndLikesObj(blogs[0].author, blogs[0].likes);
  } else {
    // get all authors from blog
    let blogAuthors = blogs.map((blog) =>
      authorAndLikesObj(blog.author, blog.likes)
    );

    // filter for unique authors and sum the likes for the unique authors
    blogAuthors.forEach((authorObj) => {
      let uniqueAuthorIdx = uniqueAuthors.findIndex(
        (e) => e.author === authorObj.author
      );

      if (uniqueAuthorIdx >= 0) {
        uniqueAuthors[uniqueAuthorIdx].likes += authorObj.likes;
      } else {
        uniqueAuthors.push(authorAndLikesObj(authorObj.author, authorObj.likes));
      }
    });
  }

  // determine author with most likes
  maxLikes = Math.max(...uniqueAuthors.map((author) => author.likes));
  topAuthorIdx = uniqueAuthors.findIndex((author) => author.likes === maxLikes);
  topAuthor = uniqueAuthors[topAuthorIdx];

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
