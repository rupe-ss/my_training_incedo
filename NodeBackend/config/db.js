const mongoose = require("mongoose");

dbConnect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://rupesh:Password123@cluster0.cezjfgg.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
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
