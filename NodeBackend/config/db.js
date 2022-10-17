const mongoose = require("mongoose");

dbConnect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://rupesh:*#Cluster09@cluster0.zipbakq.mongodb.net/?retryWrites=true&w=majority",
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
