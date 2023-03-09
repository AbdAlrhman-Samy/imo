const express = require("express");
const postsRouter = express.Router();

const { getAllPosts, getPostById } = require("../controllers/posts");

postsRouter.get("/", getAllPosts);

postsRouter.get("/post/:id", getPostById);

module.exports = postsRouter;