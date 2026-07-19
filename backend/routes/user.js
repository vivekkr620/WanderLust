// const express = require("express");
// const router = express.Router();

// // const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");

// const passport = require("passport");

// const { saveRedirectUrl } = require("../middleware");

// const userController = require("../controllers/users.js");
// // const user = require("../models/user.js");

// router 
//   .route("/signup")
//   .get(userController.renderSignupForm)
//   .post(wrapAsync(userController.signup));

// router
//   .route("/login")
//   .get(userController.renderLoginForm)
//   .post(
//     saveRedirectUrl,

//     /* passport se login */
//     passport.authenticate("local", {
//       failureRedirect: "/login",
//       failureFlash: true, // authentication fail
//     }),
//     userController.login
//   );

// // LOG OUT ROUTE
// router.get("/logout", userController.logout);

// module.exports = router;


// ================================================


// const express = require("express");
// const router = express.Router();

// const wrapAsync = require("../utils/wrapAsync.js");
// const passport = require("passport");

// const jwt = require("jsonwebtoken");

// const userController = require("../controllers/users.js");

// router.post(
//   "/signup",
//   wrapAsync(userController.signup)
// );

// // router.post(
// //   "/login",
// //   passport.authenticate("local", {
// //     failureFlash: true,
// //   }),
// //   userController.login
// // );


// router.post(
//   "/login",
//   (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {

//       if (err) {
//         return next(err);
//       }

//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: info.message,
//         });
//       }

//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err);
//         }

//         req.user = user;

//         next();
//       });

//     })(req, res, next);
//   },

//   userController.login
// );

// router.get("/logout", userController.logout);

// module.exports = router;



/*==========================================
    FINAL &  CLEAN UPDATED CODE
  ==========================================
*/


const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const userController = require("../controllers/users.js");

/* Signup */
router.post(
  "/signup",
  wrapAsync(userController.signup)
);

/* Login */
router.post(
  "/login",
  wrapAsync(userController.login)
);

/* Logout */
router.get(
  "/logout",
  userController.logout
);

module.exports = router;