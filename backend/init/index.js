require("dotenv").config();

const mongoose = require("mongoose");

const Listing = require("../models/listing");
const initData = require("./data");

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
  console.log("✅ MongoDB Connected");
}

main()
  .then(initDB)
  .catch(console.log);

async function initDB() {
  await Listing.deleteMany({});

  // Add default geometry to every listing
  const listings = initData.data.map((listing) => ({
    ...listing,
    geometry: {
      type: "Point",
      coordinates: [-74.005974, 40.712776], // Default coordinates
    },
  }));

  await Listing.insertMany(listings);

  console.log("✅ Database Initialized");

  process.exit();
}