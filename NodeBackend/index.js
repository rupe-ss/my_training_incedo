/* Set up Express Server */
const express = require("express"); //commonJs(90% Developers) or ecmaScript
const app = express(); //app represents express for us.
const func = require("./functions");
const fetch = require("node-fetch");

//Cloud is going to give port number
const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log("Server is running.");
});

/* Simple get API */
app.get("/", (req, res) => {
  res.send({
    value: func.add(4, 5),
  });
});

func.placeOrder("Iphone 23", () => console.log("Make the payment."));

//Async and wait(Promise replaces with)
// If we can an API using fetch it returns a Promise. But this fetch is in node-fetch library.
/* API for getting all users from remote server */
app.get("/users", (req, res) => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
});

/* Call the above API using async await method */
app.get("/users/async", async (req, res) => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    res.send(data);
  } catch (err) {
    res.send(400, { error_msg: err.msg });
  }
});
