// const Listing = require("../models/listing.js");
// const Review = require("../models/review.js");


// module.exports.createReview = async (req, res) => {
//   console.log(req.params.id);

//   let listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     req.flash("error", "Listing not found.");
//     return res.redirect("/listings");
//   }

//   // CREATE New review
//   let newReview = new Review(req.body.review); //review[rating] & review[comment] - yeah dono pass hogi

//   //add author to review
//   newReview.author = req.user._id;

//   // console.log(newReview);
//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();

//   req.flash("success", "New review created");
//   res.redirect(`/listings/${listing._id}`);
// };


// /* Delete/Destroy */
// module.exports.destroyReview = async (req, res) => {
//     //acces id and review_id
//     let { id, reviewId } = req.params;

//     const listing = await Listing.findById(id);

//     if (!listing) {
//       req.flash("error", "Listing not found.");
//       return res.redirect("/listings");
//     }

//     /* Delete from the listing array - bcoz listing will be updated*/
//     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//     await Review.findByIdAndDelete(reviewId);

//     req.flash("success", "Review is Deleted");
//     res.redirect(`/listings/${id}`);
// } 



/* -========================================================== */

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  const newReview = new Review(req.body.review);

  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review created.");
  return res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully.");
  return res.redirect(`/listings/${id}`);
};