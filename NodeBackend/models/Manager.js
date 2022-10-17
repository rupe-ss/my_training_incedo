const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  email: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = Employee = mongoose.model("manager", ManagerSchema);
