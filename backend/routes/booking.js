const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");

const { verifyToken } = require("../middleware/authMiddleware");
const { validateBooking } = require("../middleware");

const bookingsController = require("../controllers/bookings");

/* GET MY BOOKINGS */
router.get(
  "/my",
  verifyToken,
  wrapAsync(bookingsController.getMyBookings)
);

/* CREATE BOOKING */
router.post(
  "/",
  (req, res, next) => {
    console.log("POST BOOKING ROUTE HIT");
    next();
  },
  verifyToken,
  validateBooking,
  wrapAsync(bookingsController.createBooking)
);

module.exports = router;