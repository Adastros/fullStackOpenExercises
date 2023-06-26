const BlogLikes = ({ incrementLikes, title, id, likes }) => {
  const likeComponentStyle = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "1rem",
  };

  const onLikeClick = () => {
    incrementLikes(id, likes);
  };

  return (
    <div id={`likes-${title.replace(/\s/g, "-")}`} style={likeComponentStyle}>
      <div>{`Likes: ${likes}`}</div>
      <button onClick={onLikeClick}>Like</button>
    </div>
  );
};

export default BlogLikes;
