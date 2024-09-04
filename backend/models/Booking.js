
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        clientPhone: { type: String, required: true },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        bookingDate: { type: Date, required: true },
        bookingTime: { type: String, required: true },
        bookingDays: { type: String, required: true },
        roomId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Booking", bookingSchema);
