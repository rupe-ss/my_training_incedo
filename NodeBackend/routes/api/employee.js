const express = require("express");
const Employee = require("../../models/Employee");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const Manager = require("../../models/Manager");

/* 
   @Path: /api/employee/all:managerEmail
   @response: all employees that works with 'managerEmail'
*/
router.get("/all/:managerEmail", async (req, res) => {
  const managerEmail = req.params["managerEmail"];
  const employee = await Employee.find({ managerEmail }).select(
    "-managerEmail"
  );
  res.send(employee);
});

/* 
   @Path: /api/employee/add 
   @body: name*, jobTitle*,managerEmail*,email*,password*,imageUrl 
*/
router.post(
  "/add",
  body("email", "Vaid Email is required").isEmail(),
  body("password", "Passoword of min length 5 is required").isLength({
    min: 5,
  }),
  body("managerEmail", "Valid manager email is required").isEmail(),
  body("name", "Name is required").not().isEmpty(),
  body("jobTitle", "JobTitle is required").not().isEmpty(),
  async (req, res) => {
    /* check if error exists */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /* Read the data from the request body */
    const { name, jobTitle, managerEmail, email, password } = req.body;

    /* Assign role and status */
    const role = "EMPLOYEE";
    const status = "0";

    /* Check if the employee email exists */
    let employee = await Employee.findOne({ email });

    if (employee) {
      return res.status(400).json({ msg: "Employee Email already in Use" });
    }

    /* check if managerEmail exists in the DB */
    const manager = await Manager.findOne({ email: managerEmail });

    if (!manager) {
      return res.status(400).json({ msg: "Manager Email Invalid" });
    }

    /* Create Objects of employee and user */
    employee = new Employee({
      name,
      jobTitle,
      managerEmail,
      email,
      role,
      status,
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

    /* Save the objects in the DB */
    employee = await employee.save();
    user = await user.save();

    res.send(employee);
  }
);

module.exports = router;
