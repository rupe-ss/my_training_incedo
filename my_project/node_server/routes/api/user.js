const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Costumer = require("../../models/Costumer");
const User = require("../../models/User");
const { validationResult } = require("express-validator");
const Employee = require("../../models/Employee");

router.post("/add", async (req, res) => {
  /* check if error exists */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  /* Read the data from the request body */
  const { firstname, lastname, city, state, email, password, role } = req.body;

  if (!(role === "EMPLOYEE" || "COSTUMER")) {
    return res.status(400).json({ msg: "Role is invalid." });
  }

  let person;
  /* Check if the costumer email exists */
  if (role === "COSTUMER") {
    let costumer = await Costumer.findOne({ email });
    if (costumer) {
      return res.status(400).json({ msg: "Email already in use" });
    }
    /* Create Objects of costumer */
    person = new Costumer({
      firstname,
      lastname,
      city,
      state,
      email,
    });
  }

  /* Check if the costumer email exists */
  if (role === "EMPLOYEE") {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ msg: "Email already in use" });
    }
    /* Assign role and status */
    const status = "0";

    /* Create Objects of costumer */
    person = new Employee({
      firstname,
      lastname,
      city,
      state,
      email,
      role,
      status,
    });
  }

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

  /* Save the objects in the DB */

  if (person && user) {
    person = await person.save();
    user = await user.save();
    res.send("Signup Successfully");
  } else {
    return res.status(400).json({ msg: "Signup Failed" });
  }
});

module.exports = router;
