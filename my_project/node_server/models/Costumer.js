const mongoose = require("mongoose");

const CostumerSchema = new mongoose.Schema({
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
});

module.exports = Costumer = mongoose.model("costumer", CostumerSchema);
