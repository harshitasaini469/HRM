const express = require("express");
const app = express();
const multer = require("multer");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());
// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  },
});

const upload = multer({ storage: storage });
const PORT = process.env.PORT || 5000;
const dbURI =
  "mongodb+srv://user:UsEr@express.jixdggx.mongodb.net/HRM?retryWrites=true&w=majority&appName=express";
mongoose
  .connect(dbURI)
  .then(() => app.listen(PORT, () => console.log("server running")))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
