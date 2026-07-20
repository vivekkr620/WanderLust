const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");

/* ===========================
   CREATE REVIEW
=========================== */
module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const newReview = new Review(req.body.review);

  // JWT User
  newReview.author = req.user.id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    review: newReview,
  });
};

/* ===========================
   DELETE REVIEW
=========================== */
module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ExpressError(404, "Review not found");
  }

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
    review: deletedReview,
  });
};