const { createObjectId } = require("../helpers/utils");

const userNull = {};

const userAdmin = {
  _id: createObjectId("66e7abc34d9015f6e43bdc3e"),
  displayName: "admin",
  fname: "admin",
  lname: "",
  op_lvl: 1,
  email: "email@admin.com",
  profilePicURI: ""
};

const userManager = {
  _id: createObjectId("66e7abc34d9015f6e43bdc3f"),
  displayName: "manager",
  fname: "manager",
  lname: "",
  op_lvl: 2,
  email: "email@manager.com",
  profilePicURI: ""
};

const userCustomer = {
  _id: createObjectId("66e7abc34d9015f6e43bdc40"),
  displayName: "customer one",
  fname: "customer",
  lname: "one",
  email: "email@customer.com",
  profilePicURI: ""
};

module.exports = {
  userNull,
  userAdmin,
  userManager,
  userCustomer
};
