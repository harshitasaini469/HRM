// routes/bookingRoutes.js

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
    const booking = new Booking({
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        room: req.body.room,
        price:req.body.price,
        bookingDate: req.body.bookingDate,
        bookingTime: req.body.bookingTime,
        bookingDays: req.body.bookingDays,
        roomId: req.body.roomId,
    });

    try {
        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("room");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
