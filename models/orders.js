const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userID: String,
  itemName: String,
  amount: Number
});

module.exports = mongoose.model("Order", orderSchema);
