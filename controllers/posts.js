const db = require("../models/db")
const Post = require("../models/post")

const getAllPosts = (req, res) => {
  Post.getAll((posts, err) => {
    if (err) {
      return res.render("error.njk", { error: err });
    }
    return res.render("posts.njk", { posts });
  });
}

const getPostById = (req, res) => {
  const { id } = req.params;
  Post.getById(id, (post, err) => {
    if (err) {
      return res.render("error.njk", { error: err });
    }
    return res.render("post.njk", post);
  });
};


module.exports = {
  getAllPosts,
  getPostById
}