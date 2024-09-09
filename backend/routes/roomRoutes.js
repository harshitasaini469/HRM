const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/"); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        ); // Save with unique name
    },
});

// Multer setup for handling up to 5 image uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB per image
}).array("roomImages", 5); // Accept up to 5 images in the 'roomImages' field

// Route to get all rooms
router.get("/room-booking", async(req, res) => {
    try {
        const rooms = await Room.find();
        return res.json(rooms);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Route to get room by ID
router.get("/:id", async(req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        return res.json(room);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Route to add a new room (with image upload)
router.post("/", (req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        // Create new room with uploaded image URLs
        const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
        const room = new Room({
            type: req.body.roomType,
            totalRooms: req.body.totalRooms,
            price: req.body.price,
            images: imageUrls, // Store image URLs in the database
        });

        try {
            const newRoom = await room.save();
            return res.status(201).json(newRoom);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    });
});

// Route to update the total number of rooms for a specific room
router.put("/:id", async(req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id, {
                totalRooms: req.body.totalRooms,
            }, { new: true }
        ); // Return the updated document

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({ room });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;