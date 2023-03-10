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

const createPost = (req, res) => {
  const { title, content, thumbnail, header, authorID } = req.body;
  const newPost = new Post(title, content, authorID, thumbnail, header);
  Post.create(newPost, (post, err) => {
    if (err) {
      return res.render("error.njk", { error: err });
    }
    return res.redirect(`/post/${post.id}`);
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content, thumbnail, header, authorID } = req.body;

  Post.updateById(
    id,
    { title, content, thumbnail, header, authorID },
    (post, err) => {
      if (err) {
        return res.render("error.njk", { error: err });
      }
      return res.redirect(`/post/${post.id}`);
    }
  );
};


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
  deletePost
}