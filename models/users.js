const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  displayName: String,
  fname: String,
  lname: String,
  email: String,
  profilePicURI: String,
  creationDate: String
});

module.exports = mongoose.model("User", userSchema);
