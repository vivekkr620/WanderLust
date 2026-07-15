// const Listing = require("./backend/models/listing.js");
// const Review = require("./backend/models/review.js");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js"); //joi schema

// /* To check user is logged in or not */

// module.exports.isLoggedIn = (req, res, next) => {
//   // console.log(req.path, "..", req.originalUrl);
//   if (!req.isAuthenticated()) {
//     // user logged in hai/nahi
//     req.session.redirectUrl = req.originalUrl; // originalUrl is the complete URL
    
//     req.flash("error", "You must be logged in to create Listing!");
//     return res.redirect("/login");
//   }
//   next();
// };

// // to save redirectUrl
// module.exports.saveRedirectUrl = (req, res, next) => {
//   if (req.session.redirectUrl) {
//     res.locals.redirectUrl = req.session.redirectUrl;
//   }
//   next();
// };

// // listing's owner
// module.exports.isOwner = async (req, res, next) => {
//   let { id } = req.params;

//   // Create middleware for that
//   let listing = await Listing.findById(id);
//   if (!listing.owner._id.equals(res.locals.currUser._id)) {
//     req.flash("error", "You are not the owner of this listings");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };

// /* VALIDATE LISTING */
// module.exports.validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// /* VALIDATE REVIEW */
// module.exports.validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// /* isReviewAuthor */ 
// module.exports.isReviewAuthor = async (req, res, next) => {
//   let { id, reviewId } = req.params;

//   // Create middleware for that
//   let review = await Review.findById(reviewId);
//   if (!review.author.equals(res.locals.currUser._id)) {
//     req.flash("error", "You are not the author of this review");
//     return res.redirect(`/listings/${id}`);  //redirect to listing show page 
//   }
//   next();
// };


/* ============================================================================================ */

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../../schema.js");

/* Check if user is logged in */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }

  next();
};

/* Save redirect URL */
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }

  next();
};

/* Check listing owner */
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

/* Validate Listing */
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
};

/* Validate Review */
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
};

/* Check Review Author */
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};