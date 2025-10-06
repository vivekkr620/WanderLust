const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js"); //joi schema

/* To check user is logged in or not */

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.path, "..", req.originalUrl);
  if (!req.isAuthenticated()) {
    // user logged in hai/nahi
    req.session.redirectUrl = req.originalUrl; // originalUrl is the complete URL
    
    req.flash("error", "You must be logged in to create Listing!");
    return res.redirect("/login");
  }
  next();
};

// to save redirectUrl
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// listing's owner
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  // Create middleware for that
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listings");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

/* VALIDATE LISTING */
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/* VALIDATE REVIEW */
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/* isReviewAuthor */ 
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;

  // Create middleware for that
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);  //redirect to listing show page 
  }
  next();
};