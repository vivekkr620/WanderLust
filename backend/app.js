if(process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("../utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


/*require review model*/
const listingRouter = require("../routes/listing.js");
const reviewRouter = require("../routes/review.js");
const userRouter = require("../routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then((res) => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const store = MongoStore.create ({
  mongoUrl: dbUrl,
  crypto: {
    // secret: "process.env.SECRET",
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

// store.on("error", () => {
//   console.log("ERROR in MONGO SESSION STORE", err);
// });

/* UPDATED  */
store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});


const sessionOptions = {
  store,  //mongo store related information jo session ke andar ja rhai hai
  secret: "process.env.SECRET",
  resave: false,
  saveUninitialized: true,

  cookie:{ 
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //1000ms of 1 weekge
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //to prevent for cross scripting attack
  }
};

app.use(session(sessionOptions));
app.use(flash());

//Authentication and Authorization  middleware
app.use(passport.initialize());
app.use(passport.session());

// Local strategy setup
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //store the info related to user
passport.deserializeUser(User.deserializeUser());

 

//create MiddleWare for flash messages
app.use((req, res, next) => {

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  //jiss v user ka session chal rha hai uss se related information 
  res.locals.currUser = req.user; 

  next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);   // /listings/:id/reviews - parent route
app.use("/", userRouter);


// All incoming request match
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

/* Define Middleware for Error handles */
app.use((err, req, res, next) => {
  
  //deconstruct our ExpressError
  let { statusCode = 500, message = "Something went wrong" } = err;
  
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is listening port is 8080");
});



/* ========================================================================================= */

// if(process.env.NODE_ENV != "production") {
//   require('dotenv').config();
// }

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors"); // ⭐ Naya package: Frontend se connect karne ke liye
// const ExpressError = require("../utils/ExpressError.js");

// // Auth and Session packages
// const session = require("express-session");
// const MongoStore = require('connect-mongo');
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("../models/user.js");

// /* Route imports */
// const listingRouter = require("../routes/listing.js");
// const reviewRouter = require("../routes/review.js");
// const userRouter = require("../routes/user.js");

// const dbUrl = process.env.ATLASDB_URL;

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(dbUrl);
// }

// // ⭐ 1. CORS Middleware Setup
// app.use(cors({
//   origin: "http://localhost:5173", // Aapke React Vite app ka URL
//   credentials: true // Session cookies ko frontend tak allow karne ke liye
// }));

// // ⭐ 2. Data Parsing Middleware (REST APIs ke liye)
// app.use(express.json()); // React se aane wale JSON data ko parse karne ke liye
// app.use(express.urlencoded({ extended: true }));


// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });

// store.on("error", (err) => {
//   console.log("ERROR in MONGO SESSION STORE", err);
// });

// const sessionOptions = {
//   store,  
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie:{ 
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000, 
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true, 
//   }
// };

// app.use(session(sessionOptions));

// // Authentication and Authorization middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Local strategy setup
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser()); 
// passport.deserializeUser(User.deserializeUser());

// // ❌ Flash message middleware yahan se hata diya gaya hai.
// // Frontend par notifications dikhane ka kaam ab React (jaise react-toastify) karega.

// // Routes
// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);   
// app.use("/", userRouter);

// // All incoming request match
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "API Endpoint not found"));
// });

// // ⭐ 3. Updated Error Handler (JSON response return karega)
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;
  
//   res.status(statusCode).json({ 
//     success: false, 
//     error: message 
//   });
// });

// app.listen(8080, () => {
//   console.log("Server is listening on port 8080");
// });