const express = require("express");
const postsRouter = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");


postsRouter.get("/", getAllPosts);

postsRouter.post("/post", createPost);

postsRouter.route("/post/:id")
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = postsRouter;