const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema, bookingSchema } = require("../schema.js");

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  console.log("Listing =", listing);
  console.log("Owner =", listing?.owner);
  console.log("User =", req.user);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (!listing.owner) {
    return res.status(500).json({
      success: false,
      message: "Listing owner missing",
    });
  }

  if (listing.owner.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not the owner of this listing.",
    });
  }

  next();
};

module.exports.validateListing = (req, res, next) => {

  console.log("BODY =", req.body);
  console.log("FILE =", req.file);

  const { error } = listingSchema.validate(req.body);

  if (error) {
    console.log(error.details);

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


/*==================================
    VALIDATE BOOKING
  ==================================
*/
module.exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");

    throw new ExpressError(400, errMsg);
  
  }

  next();
}


/*===========================
   JWT - Check Review Author
  =========================== 
*/

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ExpressError(404, "Review not found");
  }

  if (!review.author.equals(req.user.id)) {
    return res.status(403).json({
      success: false,
      message: "You are not the author of this review.",
    });
  }

  next();
};