const User = require("../models/user");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");

// @desc    Signup user
// @route   POST /user/signup
// @access  Public
const signup = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  User.findByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message, source: "findByEmail" });
    }
    if (user) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // if user does not exist, create new user
    const newUser = new User(username, email, hashedPassword);
    User.create(newUser, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message, source: "createUser"});
      }
      return res.status(201).json({ message: "User created successfully!" });
    });
    
  });
});

// @desc    Login user
// @route   POST /user/login
// @access  Public
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(400).json({ error: "Email does not exist." });
    }

    // if user exists, compare hashed password and then return user if it matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(user);
  });
});

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
  signup,
  login,
  toggleAdmin,
  deleteUser,
};
