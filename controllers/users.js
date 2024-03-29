/**
 * Started implementing functionality for users.
 * Contains functionality for creating, reading, updating, and deleting users according to the Joi schema.
 */
const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['User']
  /* #swagger.security = [{
      "OAuthUser": [
        "read"
      ]
  }] */
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("users")
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

const getUserById = async (req, res) => {
  // #swagger.tags = ['User']
  res.status(200).json({ message: "GET user by ID Endpoint" });

  // data validation for user ID
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }

  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ message: "User not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching single user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  // #swagger.tags = ['User']
  const user = {
    displayName: req.body.displayName,
    fname: req.body.fname,
    lname: req.body.lname,
    profilePicURI: req.body.profilePicURI,
    email: req.body.email,
    creationDate: req.body.creationDate
  };

  res.status(200).json({ message: "User POST request" });

  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "Something went wrong when adding a user.");
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['User']
  res.status(200).json({ message: "User PUT reuest" });
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  res.status(200).json({ message: "User DELETE reuest" });
};

const login = async (req, res) => {
  // #swagger.tags = ['User']
  res.status(200).json({ message: "Login Endpoint" });
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
};
