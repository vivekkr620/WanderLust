const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview = async (req, res) => {
  console.log(req.params.id);
  //access listing id
  let listing = await Listing.findById(req.params.id);

  // CREATE New review
  let newReview = new Review(req.body.review); //review[rating] & review[comment] - yeah dono pass hogi

  //add author to review
  newReview.author = req.user._id;

  // console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review created");
  res.redirect(`/listings/${listing._id}`);
};


/* Delete/Destroy */
module.exports.dstroyReview = async (req, res) => {
    //acces id and review_id
    let { id, reviewId } = req.params;

    /* Delete from the listing array - bcoz listing will be updated*/
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review is Deleted");
    res.redirect(`/listings/${id}`);
}