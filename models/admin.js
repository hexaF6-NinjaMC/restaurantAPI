const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  displayName: String,
  fname: String,
  lname: String,
  email: String,
  op_lvl: Number,
  profilePicURI: String,
  creationDate: String
});

module.exports = mongoose.model("Admin", adminSchema);
