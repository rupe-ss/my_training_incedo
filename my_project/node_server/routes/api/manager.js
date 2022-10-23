const express = require("express");
const Employee = require("../../models/Employee");
const router = express.Router();

router.put("/update/employee", async (req, res) => {
  const { email, role } = req.body;

  if (role == "COSTUMER") {
    return res.status(400).json({ msg: "Role is invalid." });
  }

  let employee = await Employee.findOne({ email });

  if (employee) {
    employee.role = "MANAGER";
    employee = employee.save();
    return res.status(200).json({
      msg: "Employee updated sucessfully. Employee role is " + role + " now.",
    });
  } else {
    return res
      .status(400)
      .json({ msg: "Unable to update the role of employee." });
  }
});

module.exports = router;
