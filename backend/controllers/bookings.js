const Booking = require("../models/booking");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

/* =====================================
    CREATE BOOKING
   =====================================
*/

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;

  // Find listing
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const { booking } = req.body;

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);

  /* Calculate number of nights */
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const nights = Math.ceil((checkOutDate - checkInDate) / MILLISECONDS_PER_DAY);

  /* Safety Check */
  if (nights <= 0) {
    throw new ExpressError(
        400, "Check-out must be after check-in."
    );
  }

  /* Price Calculation */
  const totalPrice = listing.price * nights;


  /* CREATE BOOKING */
  const newBooking = new Booking({
    listing: id,
    user: req.user.id,

    checkIn: checkInDate,
    checkOut: checkOutDate,

    guests: booking.guests,

    totalPrice
  });

  await newBooking.save();

  res.status(201).json({
    success: true,
    message: "Booking successfully",
    booking: newBooking,
  });
};

/* GET MY BOOKINGS */
module.exports.getMyBookings = async (req, res) => {

  const bookings = await Booking.find({
    user: req.user.id,
  })
    .populate("listing")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    bookings,
  });

};