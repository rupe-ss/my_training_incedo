const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("employee / API Called..");
});

module.exports = router;
