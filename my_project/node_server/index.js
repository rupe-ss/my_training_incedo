const express = require("express");
const app = express();
const { dbConnect } = require("./config/mongodb");
const cors = require("cors");

const PORT = process.env.PORT | 5000;

/*Connect a MongoDB */
dbConnect();

/* Try to  */
app.use(cors());

// API Middleware, comes into play while working with token
app.use(
  express.json({
    extended: false,
  })
);

app.use("/api/costumer", require("./routes/api/costumer"));

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}.`);
});
