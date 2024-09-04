const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/room-booking", async(req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async(req, res) => {
    const room = new Room({
        type: req.body.type,
        totalRooms: req.body.totalRooms,
        price: req.body.price,
        image: req.body.image,
    });
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;