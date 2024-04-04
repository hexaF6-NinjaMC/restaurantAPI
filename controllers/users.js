/**
 * Started implementing functionality for users.
 * Contains functionality for creating, reading, updating, and deleting users according to the Joi schema.
 */
const mongodb = require("../data/database");
const { createObjectId } = require("../helpers/utils");
const { userPOSTSchema, userPUTSchema } = require("../helpers/validate");

const getAll = async (req, res, next) => {
  // #swagger.tags = ["User"]
  // #swagger.summary = "Get All User records."
  // #swagger.description = "Get All User records."
  // #swagger.responses[200] = {description: "OK: User record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the User profile."}
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

const getUserById = async (req, res, next) => {
  // #swagger.tags = ["User"]
  // #swagger.summary = "Get User record by ID."
  // #swagger.description = "Get User record by ID."
  // #swagger.responses[200] = {description: "OK: User record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the User profile."}
  try {
    const userId = createObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("users")
      .findOne({ _id: userId });

    if (!result) {
      res.status(404).json({ message: "User not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  // #swagger.tags = ["User"]
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaUserRequired"
        }
      }
    }
  } */
  // #swagger.summary = "Create a new User record."
  // #swagger.description = "Create a new User record."
  // #swagger.responses[200] = {description: "OK: User record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the User profile."}
  try {
    const user = {
      displayName: req.body.displayName,
      fname: req.body.fname,
      lname: req.body.lname,
      profilePicURI: req.body.profilePicURI,
      email: req.body.email,
      creationDate: new Date().toLocaleDateString()
    };

    const userData = await userPOSTSchema.validateAsync(user, {
      allowUnknown: true
    });

    const response = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("users")
      .insertOne(userData);
    if (response.acknowledged) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(response.error || "Something went wrong when adding a user.");
    }
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  // TODO: implement user creation, permission handling for op-lvl 1
  // #swagger.tags = ["User"]
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaUserOptional"
        }
      }
    }
  } */
  // #swagger.summary = "Update User record, ref'd by _id, with optional fields."
  // #swagger.description = "Update User record, ref'd by _id, with optional fields."
  // #swagger.responses[200] = {description: "OK: User record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the User profile."}
  try {
    const ID = createObjectId(req.params.id);

    const user = {
      displayName: req.body.displayName,
      fname: req.body.fname,
      lname: req.body.lname,
      profilePicURI: req.body.profilePicURI,
      email: req.body.email,
      creationDate: new Date().toLocaleDateString()
    };
    const userData = await userPUTSchema.validateAsync(user, {
      allowUnknown: true
    });
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("users")
      .findOneAndUpdate(
        { _id: ID },
        {
          $set: userData
        },
        {
          returnDocument: "after"
        }
      );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ["User"]
  // #swagger.summary = "Delete User record, ref'd by _id, with optional fields."
  // #swagger.description = "Delete User record, ref'd by _id, with optional fields."
  // #swagger.responses[200] = {description: "OK: User record was successfully created."}
  // #swagger.responses[204] = {description: "No Content: User record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the User profile."}
  try {
    const userId = createObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleteOne({ _id: userId }, true);
    if (response.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Nothing to delete by ID ${userId}.` });
    }
    res.status(200).json({ message: "User record successfully deleted." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
