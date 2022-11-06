const express = require("express");

const router = express.Router();
const controller = require("../controllers/flightController");

// router.get('/', controller.example)
// Chaining my routes...
router
  .get("/", controller.getAllFlightBookings)
  .get("/:id", controller.getOneFlightBooking)
  .post("/", controller.addFlightBooking)
  .put("/:id", controller.updateOneFlightBooking)
  .delete("/:id", controller.deleteFlight);

module.exports = router;
