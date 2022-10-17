const express = require("express");
const Employee = require("../../models/Employee");
const Manager = require("../../models/Manager");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

router.get("/", (req, res) => {
  res.send("auth / API Called..");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    /*Check user account is activated */
    if (user.role === "EMPLOYEE") {
      let employee = await Employee.findOne({ email });
      if (employee.status === "0") {
        return res.status(400).json({ msg: "Employee login not enabled" });
      }
    }

    /* Verify the password*/
    let isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    /* Generate the token*/
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "123456", { expiresIn: "2h" }, (err, token) => {
      if (err) throw err;
      res.json(token);
    });
  } catch (err) {
    res.send(500).json({
      msg: "Server Error",
    });
  }
});

router.get("/user", auth, async (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    const role = user.role;
    if (role == "EMPLOYEE") {
      const employee = await Employee.findOne({ email: user.email }).select(
        "-status"
      );
      const manager = await Manager.findOne({
        email: employee.managerEmail,
      });
      employee.managerName = manager.name;
      return res.status(200).send(employee);
    } else {
      const manager = await Manager.findOne({ email: user.email });
      return res.status(200).send(manager);
    }
  } catch (err) {
    res.status(500).json({
      msg: "Server error",
    });
  }
  res.send("user api called...");
});

module.exports = router;
