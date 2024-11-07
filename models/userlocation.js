const mongoose = require("mongoose");
const moment = require("moment");

const userLocationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: Date,
    default: moment(new Date()).format("LLLL"),
  },
});

module.exports = mongoose.model("userLocation", userLocationSchema);
