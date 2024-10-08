const express = require("express");
const app = express();

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const path = require("path");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up multer for file storage

const PORT = process.env.PORT || 5000;
const dbURI =
    "mongodb+srv://user:UsEr@express.jixdggx.mongodb.net/HRM?retryWrites=true&w=majority&appName=express";
mongoose
    .connect(dbURI)
    .then(() => app.listen(PORT, () => console.log("server running")))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));