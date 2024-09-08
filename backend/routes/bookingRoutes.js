// routes/bookingRoutes.js

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
  const {
    clientName,
    clientPhone,
    room,
    roomTypeId,
    price,
    bookingDate,
    bookingDays,
    roomId,
  } = req.body;

  console.log("in booking ");
  const booking = new Booking({
    clientName,
    clientPhone,
    room,
    roomTypeId,
    price,
    bookingDate,
    bookingDays,
    roomId,
  });

  try {
    const newBooking = await booking.save();
    return res.status(201).json(newBooking);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Get all bookings
router.get("/bookedRooms", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// Get a Room
router.get("/:id", async (req, res) => {
  try {
    const room = await Booking.findOne({ roomId: req.params.id });
    return res.json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const room = await Booking.findOneAndDelete({ roomId: req.params.id });
    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }
    return res.status(200).json({ room: room });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
