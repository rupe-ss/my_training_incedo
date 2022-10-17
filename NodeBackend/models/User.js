const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
