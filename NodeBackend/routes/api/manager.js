const express = require("express");
const Manager = require("../../models/Manager");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

/* 
   @Path: /api/manager/add 
   @payload: name*, jobTitle*,email*,imageUrl 
*/
router.get("/all", async (req, res) => {
  const manager = await Manager.find();
  res.send(manager);
});

/* 
   @Path: /api/manager/add 
   @body: name*, jobTitle*,email*,password*,imageUrl 
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

  /* Assign hashed password to user object */
  user.password = hashPassword;

  manager = await manager.save();
  user = await user.save();

  res.json(manager);
});

module.exports = router;
