const express = require("express");
const postsRouter = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");
const requireAdmin = require("../middleware/adminMiddleware");
const requireAuth = require("../middleware/authMiddleware");


postsRouter.get("/", getAllPosts);

postsRouter.post("/post", [requireAuth, requireAdmin], createPost);

postsRouter.route("/post/:id")
  .get(getPostById)
  .put([requireAuth, requireAdmin], updatePost)
  .delete([requireAuth, requireAdmin], deletePost);

module.exports = postsRouter;