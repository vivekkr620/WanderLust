const User = require("../models/user.js");


/* signup form render */
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

/*  signup the user */
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
 
    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    // console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      // res.redirect("/listings");
      return res.redirect("/listings");

    });

  } catch (err) {

    req.flash("error", err.message);
    // res.redirect("/signup");
    return res.redirect("/signup");

  }
};

/* render LoginForm */
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

/* login form submit (User exist in DB or not) */
// This is done by passport.authenticate in routes/user.js

module.exports.login = async (req, res) => {

  req.flash("success", "Welcome back to your account! You are logged in");

  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);

};


/* LOG OUT ROUTE */
module.exports.logout = (req, res, next) => {

  req.logout((err) => {

    if(err) {
      return next(err)
    }

    req.flash("success", "You are logged out!");
    res.redirect("/listings");
    
  })
}