const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(Date.now),
  },
});

module.exports = mongoose.model("userDetails", userDetailsSchema);
