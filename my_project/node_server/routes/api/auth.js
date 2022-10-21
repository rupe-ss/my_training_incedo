const express = require("express");
const Employee = require("../../models/Employee");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

module.exports = router;
