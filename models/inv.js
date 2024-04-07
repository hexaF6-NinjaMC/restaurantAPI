const mongoose = require("mongoose");

const invSchema = mongoose.Schema({
  productName: String,
  description: String,
  stock: Number,
  price: Number
});

module.exports = mongoose.model("Inventory", invSchema);
