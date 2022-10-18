const express = require("express");
const auth = require("../../middleware/auth");
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ticket / API Called..");
});

/* 
   @Path: /api/ticket/add
   @body: issue*, priority*, email*: from token
*/
router.post("/add", auth, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  /* Read email from thr token */
  const email = user.email;

  const { issue, priority } = req.body;

  let ticket = new Ticket({
    issue,
    priority,
    email,
  });

  ticket = await ticket.save();

  res.send(ticket);
});
module.exports = router;
