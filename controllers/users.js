const User = require("../models/user.js");


/* signup form render */
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

/*  signup the user */
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // create new user
    const newUser = new User({ email, username });

    // to register in the Database (Info is store in the DB)
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    /*Info store hote hii automatic login jo jaye*/
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

/* render LoginForm */
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

/* login form submit (User exist in DB or not) */
// This is done by passport.authenticate in routes/user.js
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to your account! You are loged in");

  // conditon - to check redirect url empty hai ya nahi
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};


/* LOG OUT ROUTE */
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  })
}