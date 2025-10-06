const Listing = require("../models/listing");
// geocoding service start
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(res);
  res.render("listings/index.ejs", { allListings });
};

/* ---------------(1)- New Route */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

/* --------SHOW ROUTE (READ) ------*/
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } }) //owner of reviews
    .populate("owner"); //owner information

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

/* CREATE - {(1) NEW ROUTE (2) CREATE ROUTE } */
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      // query: "Kolkata, India",
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);

  const newListing = new Listing(req.body.listing); //data from form will be in req.body.listing

  /* Store current user id */
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  let savedListing = await newListing.save(); //add in DB
  console.log("Saved Listing:", savedListing);
  req.flash("success", "New Listing is created");
  res.redirect("/listings");
};

/*-----EDIT ROUTE { form ko render karega }*/
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id); //find out listing after find id

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }

  //image quality will be low
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

/* update route (call this route after form submition) */
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //file ke alawa baaki data update ho jayega

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing is Updated");
  res.redirect(`/listings/${id}`); //redirect on show route
};

/* DELETE ROUTE or DESTROY ROUTE */
module.exports.destroyListing = async (req, res) => {
  /* MongoDB me jaake ID ke basis pe record dhundhega and usse delete kareag */
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing is deleted");
  res.redirect("/listings");
};
