const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  issue: {
    type: String,
  },
  priority: {
    type: String,
  },
  email: {
    type: String,
  },
  resposne: {
    type: String,
  },
  status: {
    type: String,
    default: "OPEN",
  },
  responseByEmail: {
    type: String,
  },
  generatedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
