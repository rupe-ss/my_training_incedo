add = (n1, n2) => {
  return n1 + n2;
};

placeOrder = (order, callback) => {
  console.log("Order Placed: " + order);
  callback();
};

module.exports = { add, placeOrder };
