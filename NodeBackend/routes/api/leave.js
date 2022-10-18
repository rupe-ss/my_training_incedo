const express = require("express");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employee");
const Leave = require("../../models/Leave");
const User = require("../../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("leave / API Called..");
});

/* 
   @Path: /api/leave/add 
   @body: From*, To*, days*, email* 
*/
router.post("/add", auth, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    const { from, to, days } = req.body;
    const email = user.email;

    /* Fetch employee details to check if Employees has sufficient leaves*/
    let employee = await Employee.findOne({ email });

    if (!(employee.leavesLeft >= days)) {
      res.status(400).json({
        msg: "Total leaves pending are" + employee.leavesLeft,
      });
    }

    let leave = new Leave({
      from,
      to,
      days,
      email,
    });

    leave = await leave.save();
    res.send(leave);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server error",
    });
  }
});

router.get(
  "/update-status/:employeeEmail/:leaveId/:status",
  auth,
  async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    const managerEmail = user.email;

    const email = req.params["employeeEmail"];
    const leaveId = req.params["leaveId"];
    const status = req.params["status"];

    /*Fetch employee recod */
    let employee = await Employee.findOne({ email });

    if (!(employee.managerEmail === managerEmail)) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    /* Fetch leave record */
    let leave = await Leave.findById(leaveId);

    leave.status = status;
    if (status === "APPROVED")
      employee.leavesLeft = employee.leavesLeft - leave.days;

    leave = await leave.save();
    employee = await employee.save();

    res.status(200).json({ msg: "Status updated." });
  }
);

/* 
   @Path: /api/leave/comment 
   @body: comments*, leaveId*
*/
router.post("/comment", auth, async (req, res) => {
  const { comment, leaveId } = req.body;

  /* Fetch leave data*/
  let leave = await Leave.findById(leaveId);
  leave.comments = comment;

  leave = await leave.save();

  res.status(200).json({ msg: "Comments Added" });
});

/* 
   @Path: /api/leave/all
   @Get
*/
router.get("/all", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const managerEmail = user.email;
  if (!(user.role === "MANAGER")) {
    res.status(401).json({ msg: "Unauthorized" });
  }

  let leaves = [];
  /* Fetch all employees havind managerEmail as user.email*/
  const employees = await Employee.find({ managerEmail: user.email });
  for (let e of employees) {
    /*For each employeee, fetch all pending leaves */
    let leaveArray = await Leave.find({
      $and: [{ email: e.email }, { status: "PENDING" }],
    });
    leaves = [...leaves, ...leaveArray];
  }
  res.send(leaves);
});

module.exports = router;
