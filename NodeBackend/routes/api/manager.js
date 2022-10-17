const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const Manager = require("../../models/Employee");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("manager / API Called..");
});

/*  @Path: /api/employee/add
    @body: name*, jobTitle*, email*, password*, imageUrl
*/
router.post("/add", async (req, res) => {
  const { name, jobTitle, email, password, imageUrl } = req.body;
  const role = "MANAGER";
  let manager = new Manager({
    name,
    jobTitle,
    email,
    imageUrl,
    role,
  });

  let user = new User({
    email,
    password,
    role,
  });

  /* Encrypt the password */
  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password, salt);

  /* Assign hashed password to user Object*/
  user.password = hashPassword;

  manager = await manager.save();
  user = await user.save();

  res.send(manager);
});

module.exports = router;
