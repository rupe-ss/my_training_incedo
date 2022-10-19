const mongoose = require("mongoose");

dbConnect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://rupesh:Password123@cluster0.cezjfgg.mongodb.net/my_project?retryWrites=true&w=majority",
      () => {
        console.log("MongoDB Connected...");
      }
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { dbConnect };
