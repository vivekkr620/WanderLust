//write logic for initilization
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log("Some error in DB");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

//make funciton
const initDB = async () => {
  //FIRSTLY - clean random data form DB
  await Listing.deleteMany({});

  //insert OWNER property in the new Array and store in the same variable
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68bdcd758c76182cc7af9c96",
  }));

  /*insert our data after delete*/
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

//call initDB function
initDB();
