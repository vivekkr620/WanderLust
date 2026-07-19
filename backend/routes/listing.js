const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

const {
  isOwner,
  validateListing,
} = require("../middleware/index.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../config/cloudConfig.js");

const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    verifyToken,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    verifyToken,
    upload.single("listing[image]"),
    validateListing,
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    verifyToken,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

module.exports = router;