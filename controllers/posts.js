const Post = require("../models/post");

// @desc    Get all posts
// @route   GET /
// @access  Public
const getAllPosts = (req, res) => {
  Post.getAll((posts, err) => {
    if (err) {
      return res.render("pages/error.njk", { error: err });
    }
    if (req.session.user) {
      return res.render("pages/home.njk", { posts, user: req.session.user });
    }
    return res.render("pages/home.njk", { posts });
  });
};

// @desc    Get single post
// @route   GET /post/:id
// @access  Public
const getPostById = (req, res) => {
  const { id } = req.params;
  Post.getById(id, (post, err) => {
    if (err) {
      return res.render("error.njk", { error: err });
    }
    return res.render("post.njk", post);
  });
};

// @desc    Create a post
// @route   POST /post
// @access  Private
const createPost = (req, res) => {
  const { title, subtitle, content, thumbnail, header, authorID } = req.body;
  const newPost = new Post(
    title,
    subtitle,
    content,
    authorID,
    thumbnail,
    header
  );
  Post.create(newPost, (postID, err) => {
    if (err) {
      console.log(err);
      return res.render("error.njk", { error: err });
    }

    // if the post was created successfully, get it from the db and render it
    // !: why does express creating a post request when i redirect to /post/:id?
    Post.getById(postID, (post, err) => {
      if (err) {
        return res.render("error.njk", { error: err });
      }
      res.render("post.njk", post);
    });
  });
};

// @desc    Update a post
// @route   PUT /post/:id
// @access  Private
const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, subtitle, content, thumbnail, header, authorID } = req.body;

  Post.updateById(
    id,
    { title, subtitle, content, thumbnail, header, authorID },
    (post, err) => {
      if (err) {
        return res.render("error.njk", { error: err });
      }
      return res.redirect(`/post/${post.id}`);
    }
  );
};

// @desc    Delete a post
// @route   DELETE /post/:id
// @access  Private
const deletePost = (req, res) => {
  const { id } = req.params;
  Post.delete(id, (err) => {
    if (err) {
      return res.render("error.njk", { error: err });
    }
    return res.redirect(`/`);
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
