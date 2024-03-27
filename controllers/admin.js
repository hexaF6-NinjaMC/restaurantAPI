/**
 * Started implementing functionality for admin(/manager?) operators.
 */

// const createError = require("http-errors"); // TODO: implement error handling
const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .find();
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "No Administrators to display." }); // Should use 200 or 404 if nothing found in collection for getAll()?
        return;
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resArr);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const createAdmin = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Admin POST request" });
};

const updateAdmin = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Admin PUT request" });
};

const deleteAdmin = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Admin DELETE request" });
};

const getAllManagers = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .find({ "op-lvl": 2 });
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "No Managers to display." }); // Should use 200 or 404 if nothing found in collection for getAll()?
        return;
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resArr);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const createManager = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Manager POST request" });
};

const updateManager = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Manager PUT request" });
};

const deleteManager = async (req, res) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  res.status(200).json({ message: "Manager DELETE request" });
};

module.exports = {
  getAll,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAllManagers,
  createManager,
  updateManager,
  deleteManager
};
