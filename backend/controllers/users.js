
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

/*===========================
   SIGNUP
  =========================== 
*/
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      // Generate JWT
      const token = jwt.sign(
        {
          id: registeredUser._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  } catch (err) {

    console.error("========== SIGNUP ERROR ==========");
    console.error(err);
    console.error(err.stack);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
/*===========================
   LOGIN (Email + Password)
===========================*/
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Find user using email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Step 2: Authenticate using username (passport-local-mongoose)
  User.authenticate()(user.username, password, (err, authenticatedUser, options) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    if (!authenticatedUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Step 3: Generate JWT
    const token = jwt.sign(
      {
        id: authenticatedUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Step 4: Send Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: authenticatedUser._id,
        username: authenticatedUser.username,
        email: authenticatedUser.email,
      },
    });
  });
};

/* ===========================
   LOGOUT
  =========================== 
*/
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};
