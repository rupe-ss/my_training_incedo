const express = require("express");
const Employee = require("../../models/Employee");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user / called..");
});

router.get("/grant-access/:email", auth, async (req, res) => {
  const email = req.params["email"];
  console.log(email);
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (user.role !== "MANAGER") {
      return res.status(403).json({ msg: "Forbidden" });
    }

    /* fetch employee details */
    let employee = await Employee.findOne({ email });

    if (employee.managerEmail !== user.email) {
      return res
        .status(401)
        .json({ msg: "Unauthorized to perform this operation" });
    }

    /* enable employee status */
    employee.status = "1";

    employee = await employee.save();
    return res.status(200).json({ msg: "Employee granted access" });
  } catch (err) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;
