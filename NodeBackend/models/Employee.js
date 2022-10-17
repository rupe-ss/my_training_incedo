const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  managerEmail: {
    type: String,
  },
  managerName: {
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
  status: {
    type: String,
  },
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
