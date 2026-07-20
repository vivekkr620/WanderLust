const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const { verifyToken } = require("../middleware/authMiddleware.js");

const {
  validateReview,
  // isLoggedIn,
  isReviewAuthor,
} = require("../middleware");

const reviewController = require("../controllers/reviews.js");

/* CREATE REVIEW */
router.post(
  "/",
  verifyToken,
  validateReview,
  wrapAsync(reviewController.createReview)
);

/* DELETE REVIEW */
router.delete(
  "/:reviewId",
  verifyToken,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;