const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");

// @desc    Get user page
// @route   GET /user
// @access  Private
const userPage = (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      Post.getAll((posts, err) => {
        if (err) {
          return res.render("pages/error.njk", { error: err });
        }
        return res.render("pages/user.njk", { posts, user: req.session.user });
      });
    } else {
      return res.render("pages/user.njk", { user: req.session.user });
    }
  } else {
    return res.redirect("/user/login");
  }
};

// @desc    Signup user
// @route   POST /user/auth/signup
// @access  Public
const signup = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .render("pages/signup.njk", { error: "Please fill in all fields." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.findByEmail(email, (err, user) => {
    if (err) {
      return res
        .status(500)
        .render("pages/signup.njk", { error: "Please fill in all fields." });
    }
    if (user) {
      return res
        .status(400)
        .render("pages/signup.njk", { error: "User already exists." });
    }

    // if user does not exist, create new user
    const newUser = new User(username, email, hashedPassword);
    User.create(newUser, (err) => {
      if (err) {
        return res
          .status(500)
          .render("pages/signup.njk", { error: err.message });
      }
      return res.status(201).render("pages/login.njk", {
        success: "User created successfully, Login now!",
      });
    });
  });
});

// @desc    Get signup page
// @route   GET /user/signup
// @access  Public
const signupPage = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  return res.render("pages/signup.njk");
};

// @desc    Login user
// @route   POST user/login
// @access  Public
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .render("pages/login.njk", { error: "Please fill in all fields." });
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).render("pages/login.njk", { error: err.message });
    }
    if (!user) {
      return res
        .status(400)
        .render("pages/login.njk", { error: "User does not exist." });
    }

    // if user exists, compare hashed password and then return user if it matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .render("pages/login.njk", { error: "Incorrect password." });
    }
    req.session.user = user;

    // if (user.isAdmin) {
    //   return res.status(200).redirect("/admin");
    // }

    return res.status(200).redirect("/");
  });
});

const loginPage = (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  return res.render("pages/login.njk");
};

// @desc    Set user as admin
// @route   PUT /user/:id/
// @access  Private
const toggleAdmin = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  User.toggleAdmin(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "User role updated successfully!" });
  });
});

// @desc    Logout user
// @route   POST /user/logout
// @access  Private
const logout = (req, res) => {
  if (!req.session.user)
    return res.render("pages/login.njk", { error: "You are not logged in." });

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render("pages/login.njk", { error: err.message });
    }
    return res.status(200).redirect("/");
  });
};

// @desc    Delete user
// @route   DELETE /user/:id/
// @access  Private
const deleteUser = async (req, res) => {
  const { id } = req.params;

  User.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "User deleted successfully!" });
  });
};

module.exports = {
  userPage,
  signup,
  signupPage,
  login,
  loginPage,
  logout,
  toggleAdmin,
  deleteUser,
};
