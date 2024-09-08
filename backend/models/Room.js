const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
