/**
 * Started implementing functionality for users.
 * Contains functionality for creating, reading, updating, and deleting users according to the Joi schema.
 */
const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("user")
      .find();
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "No users to display." }); // Should use 200 or 404 if nothing found in collection for getAll()?
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

const createUser = async (req, res) => {
  res.status(200).json({ message: "User POST reuest" });
};

const updateUser = async (req, res) => {
  res.status(200).json({ message: "User PUT reuest" });
};

const deleteUser = async (req, res) => {
  res.status(200).json({ message: "User DELETE reuest" });
};

module.exports = {
  getAll,
  createUser,
  updateUser,
  deleteUser
};
