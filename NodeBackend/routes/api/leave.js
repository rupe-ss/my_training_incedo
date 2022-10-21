const express = require("express");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employee");
const Leave = require("../../models/Leave");
const User = require("../../models/User");
const router = express.Router();

/* 
   @Path: /api/leave/employee/all 
   @token: email
   @description: gives all pending leaves for this employee
*/
router.get("/employee/all/:status", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const status = req.params["status"];

  /* Fetch all leaves using employee email and status given */
  const leaves = await Leave.find({
    $and: [{ email: user.email }, { status: status }],
  });

  res.send(leaves);
});

/* 
   @Path: /api/leave/add 
   @body: from*, to*, days*,email* 
*/
router.post("/add", auth, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    const { from, to, days } = req.body;
    const email = user.email;

    /* Fetch employee details to check if emp has sufficient leaves */
    let employee = await Employee.findOne({ email });
    if (!(employee.leavesLeft >= days)) {
      return res
        .status(400)
        .json({ msg: "Total leaves pending are " + employee.leavesLeft });
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
    res.status(500).json({ msg: "Server error" });
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

    /* Fetch employee record */
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

    res.status(200).json({ msg: "Status Updated" });
  }
);

/* 
   @Path: /api/leave/add 
   @body: comment*, leaveId* 
*/
router.post("/comment", auth, async (req, res) => {
  const { comment, leaveId } = req.body;

  /* Fetch leave record */
  let leave = await Leave.findById(leaveId);
  leave.comments = comment;

  leave = await leave.save();

  res.status(200).json({ msg: "Comment Added" });
});

/* 
   @Path: /api/leave/all/:managerEmail 
   @Get
*/
router.get("/all", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);

  if (!(user.role === "MANAGER")) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  let allDto = [];
  /* Fetch all employees having managerEmail as user.email */
  const employees = await Employee.find({ managerEmail: user.email });
  for (let e of employees) {
    /* for each employee e, fetch all pending leaves */
    let leaveArray = await Leave.find({
      //2L: harry, 2L:hermione
      $and: [{ email: e.email }, { status: "PENDING" }],
    });
    for (let l of leaveArray) {
      let dto = {
        _id: l.id,
        status: l.status,
        name: e.name,
        email: e.email,
        leavesLeft: e.leavesLeft,
        from: l.from,
        to: l.to,
        days: l.days,
      };
      allDto.push(dto);
    }
  }
  res.send(allDto);
});

module.exports = router;
