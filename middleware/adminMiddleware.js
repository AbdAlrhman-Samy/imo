const requireAdmin = (req, res, next) => {

  // if not admin, redirect to home page
  if (!req.session.user.isAdmin) {
    console.log("User is not an admin, redirecting to home page");
    return res.redirect("/");
  }
  
  next();
};

module.exports = requireAdmin;