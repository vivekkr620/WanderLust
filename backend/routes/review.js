// const express = require("express");
// const router = express.Router({ mergeParams: true });

// const wrapAsync = require("../utils/wrapAsync.js");

// // const ExpressError = require("../utils/ExpressError.js");

// // const Review = require("../models/review.js");

// // const Listing = require("../models/listing.js");

// const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware") 

// const reviewController = require("../controllers/reviews.js");

// // CREATE REVIEWS ROUTE
// /* POST REVIEW ROUTE */ 
// router.post(
//   "/",
//   isLoggedIn,
//   validateReview,
//   wrapAsync(reviewController.createReview)
// );

// /* DELETE REVIEW ROUTE */
// router.delete( 
//   "/:reviewId",
//   isLoggedIn,
//   isReviewAuthor,
//   wrapAsync(reviewController.destroyReview)
// );

// module.exports = router;





/*============================================ 
    New Updated Code
  ============================================
*/


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