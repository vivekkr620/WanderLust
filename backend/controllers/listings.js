const Listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const ExpressError = require("../utils/ExpressError.js");

/* ===========================
   GET ALL LISTINGS
=========================== */
module.exports.index = async (req, res) => {

  console.log("Search query =", req.query);

  const { q } = req.query;

  let filter = {};

  if (q) {
    filter = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ],
    };
  }

  const allListings = await Listing.find(filter);

  res.status(200).json({
    success: true,
    listings: allListings,
  });
};

/* ===========================
   GET SINGLE LISTING
=========================== */
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.status(200).json({
    success: true,
    listing,
  });
};

/* ===========================
   CREATE LISTING
=========================== */
module.exports.createListing = async (req, res) => {

  console.log("========== CREATE LISTING ==========");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  console.log("USER:", req.user);
  
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(req.body.listing);

  // JWT User ID
  newListing.owner = req.user.id;

  newListing.image = {
    url,
    filename,
  };

  newListing.geometry = response.body.features[0].geometry;

  const savedListing = await newListing.save();

  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    listing: savedListing,
  });
};

/* ===========================
   UPDATE LISTING
=========================== */
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    await listing.save();
  }

  res.status(200).json({
    success: true,
    message: "Listing updated successfully",
    listing,
  });
};

/* ===========================
   DELETE LISTING
=========================== */
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.status(200).json({
    success: true,
    message: "Listing deleted successfully",
    listing: deletedListing,
  });
};