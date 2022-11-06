const flightBookings = require("../models/Flight"); //Destructuring the object
const { v4: uuid } = require("uuid"); //This is to help us randomly generate a unique ID  for each flight booking.

// Get all Flight Logs ...
exports.getAllFlightBookings = async (req, res) => {
  try {
    const bookings = flightBookings;
    // console.log(bookings.length === 0);
    if (bookings.length === 0) {
      res.status(200).json({
        message:
          "No flight booked! Please Add a Flight booking so I can show you the list of booked flight!😊",
      }); //I just implemented a logic to tell the user of the api to create booked flights, or else, nothing has been created.
    } else {
      res.status(200).json({
        message: "The Whole Flight Bookings",
        bookings_Details: bookings,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get single flight booking...
exports.getOneFlightBooking = async (req, res) => {
  try {
    // Find the booking with the specified ID
    const booking = flightBookings.find(
      (flight) => flight.id === req.params.id
    );
    res.status(200).json({
      message: "Flight Booking has been found!",
      bookingDetails: booking,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create/Book a flight...
exports.addFlightBooking = async (req, res) => {
  try {
    const { title, time, price, date } = await req.body; //object destructuring of the items passed into the request body.
    const newFlightBooking = {
      id: uuid(),
      title,
      time,
      price,
      date,
    };

    flightBookings.push(newFlightBooking);
    res.status(201).json({
      message: "New Flight Booked!",
      bookingDetails: newFlightBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update/edit Single Flight
exports.updateOneFlightBooking = async (req, res) => {
  try {
    // Find the target flight booking to update.
    const booking = flightBookings.find(
      (flight) => flight.id === req.params.id
    );
    // take the input from the request body and update the specified flight booking.
    const { title, time, price, date } = await req.body; //destructuring for easy data access.
    booking.title = title;
    booking.time = time;
    booking.price = price;
    booking.date = date;

    res.status(200).json({
      message: "Flight Booking Updated!",
      updateDetails: booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Flight Booking...
exports.deleteFlight = async (req, res) => {
  try {
    // FIND THE FLIGHT TO REMOVE
    const booking = flightBookings.find(
      (flight) => flight.id === req.params.id
    );
    // Remove the identified flight from the list
    flightBookings.splice(flightBookings.indexOf(booking), 1);
    res.status(200).json({
      message: "Flight deleted!",
      deletedFlight: booking,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.example = (req, res) => {
  console.log("example");
  res.send("Flight example");
};
