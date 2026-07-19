// const ExpressError = require("../utils/ExpressError");

// const Listing = require("../models/listing.js");

// const Review = require("../models/review.js");


// module.exports.createReview = async (req, res) => {
//   // console.log(req.params.id);

//   // let listing = await Listing.findById(req.params.id);

//   // if (!listing) {
//   //   req.flash("error", "Listing not found.");
//   //   return res.redirect("/listings");
//   // }

//   const listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     throw new ExpressError(404, "Listing not found");
//   }

//   // CREATE New review
//   let newReview = new Review(req.body.review); //review[rating] & review[comment] - yeah dono pass hogi

//   //add author to review
//   newReview.author = req.user._id;

//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();

//   // req.flash("success", "New review created");
//   // res.redirect(`/listings/${listing._id}`);

//   res.status(201).json({
//     success: true,
//     message: "Review created successfully",
//     review: newReview,
//   });

// };


// /* Delete/Destroy */
// // module.exports.destroyReview = async (req, res) => {
// //     //acces id and review_id
// //     let { id, reviewId } = req.params;

// //     const listing = await Listing.findById(id);

// //     if (!listing) {
// //       req.flash("error", "Listing not found.");
// //       return res.redirect("/listings");
// //     }

// //     /* Delete from the listing array - bcoz listing will be updated*/
// //     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
// //     await Review.findByIdAndDelete(reviewId);

// //     req.flash("success", "Review is Deleted");
// //     res.redirect(`/listings/${id}`);
// // } 



// /* Delete / Destroy Review */
// module.exports.destroyReview = async (req, res) => {
//   const { id, reviewId } = req.params;

//   // Check listing exists
//   const listing = await Listing.findById(id);

//   if (!listing) {
//     throw new ExpressError(404, "Listing not found");
//   }

//   // Remove review reference from listing
//   await Listing.findByIdAndUpdate(id, {
//     $pull: { reviews: reviewId },
//   });

//   // Delete review document
//   const deletedReview = await Review.findByIdAndDelete(reviewId);

//   if (!deletedReview) {
//     throw new ExpressError(404, "Review not found");
//   }

//   res.status(200).json({
//     success: true,
//     message: "Review deleted successfully",
//     review: deletedReview,
//   });
// };




/*========================================================== 
    NEW UPDATED CODE
  ============================================================
*/

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