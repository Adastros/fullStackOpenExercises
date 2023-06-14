// Work around to close blog list api test 
// since Mongoose doesn't work with Jest well
module.exports = () => {
  process.exit(0);
};
