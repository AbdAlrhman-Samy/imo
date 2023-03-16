// !: creates a post request to the login page, it shouldn't do that

const requireAuth = (req, res, next) => {

  // if user is not logged in, redirect to login page
  // and  skip the redirect if the request is already a login request
  if (!req.session.user && req.url !== "/user/login" ) {
    console.log("User is not logged in, redirecting to login page");

    // save the current url to redirect to after login
    req.session.redirectTo = req.url;
    return res.redirect("/user/login");
  }
  
  next();
};

module.exports = requireAuth;