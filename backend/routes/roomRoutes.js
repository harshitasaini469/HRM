const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/room-booking", async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.json(rooms);
  } catch (err) {
    return res.json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const room = new Room({
    type: req.body.type,
    totalRooms: req.body.totalRooms,
    price: req.body.price,
    images: req.body.images,
  });
  try {
    const newRoom = await room.save();
    return res.status(201).json(newRoom);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, {
      totalRooms: req.body.totalRooms,
    });
    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }
    return res.status(200).json({ room: room });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
module.exports = router;
