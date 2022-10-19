const express = require("express");
const Costumer = require("../../models/Costumer");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

router.post(
  "/add",
  body("firstname", "FirstName is required").not().isEmpty(),
  body("lastname", "LastName is required").not().isEmpty(),
  body("city", "City is required").not().isEmpty(),
  body("state", "State is required").not().isEmpty(),
  body("email", "Vaid Email is required").isEmail(),
  body("password", "Passoword of min length 5 is required").isLength({
    min: 5,
  }),
  async (req, res) => {
    /* check if error exists */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /* Read the data from the request body */
    const { firstname, lastname, city, state, email, password } = req.body;

    /* Check if the employee email exists */
    let costumer = await Costumer.findOne({ email });

    if (costumer) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    /* Create Objects of employee and user */
    costumer = new Costumer({
      firstname,
      lastname,
      city,
      state,
      email,
    });

    let user = new User({
      email,
      password,
    });

    /* Encrypt the password */
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    /* Assign hashed password to user object */
    user.password = hashPassword;

    /* Save the objects in the DB */
    costumer = await costumer.save();
    user = await user.save();

    res.send(costumer);
  }
);

module.exports = router;
