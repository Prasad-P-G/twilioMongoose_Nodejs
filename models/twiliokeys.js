const mongoose = require("mongoose");

const twilioSchema = new mongoose.Schema({
  sid: {
    type: String,
    required: true,
  },
  auth_id: {
    type: String,
    required: true,
  },
  twilioPhone: {
    type: String,
    required: true,
  },
  admin_phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("twilioAccess", twilioSchema);
