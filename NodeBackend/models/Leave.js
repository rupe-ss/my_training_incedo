const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  from: {
    required: true,
    type: Date,
  },
  to: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  comments: {
    type: String,
  },
});

module.exports = Leave = mongoose.model("leave", LeaveSchema);
