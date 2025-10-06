const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");

const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


/*-----INDEX ROUTE { to show all the listings }-----*/
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),  //data will come in req.file
    validateListing,
    wrapAsync(listingController.createListing)
  );


/* -(1) New Route (new form render) */
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))


  //  Update Route
  .put(
    isLoggedIn, //check user loggedIn or not
    isOwner, //permission to check owner
    upload.single('listing[image]'), //data will come in req.file
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



/*-----EDIT ROUTE { form ko render karega }*/
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
