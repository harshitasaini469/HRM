const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    room: {
        type: String,
        required: true,
    },
    roomTypeId: { type: String, required: true },

    price: {
        type: Number,
        required: true,
    },
    bookingDate: { type: Date, required: true },
    bookingDays: { type: Number, required: true },
    roomId: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);