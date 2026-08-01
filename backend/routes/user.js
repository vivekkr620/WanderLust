const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const { verifyToken } = require("../middleware/authMiddleware");

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
 
/* Profile Page */
router.get(
  "/profile",
  verifyToken,
  wrapAsync(userController.getProfile)

);

router.patch(
  "/profile",
  verifyToken,
  wrapAsync(userController.updateProfile)
);

module.exports = router;