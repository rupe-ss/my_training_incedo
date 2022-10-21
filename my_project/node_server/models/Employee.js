const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "",
  },
  manager: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
