/**
 * Contains functionality for admin/manager operators.
 */

// const createError = require("http-errors"); // TODO: implement error handling
const { createObjectId } = require("../helpers/utils");
const mongodb = require("../data/database");
const { adminPOSTSchema, adminPUTSchema } = require("../helpers/validate");

/**
 * Retrieves results from record based on the `req.params.op_lvl`.
 */
const getAll = async (req, res, next) => {
  // #swagger.tags = ["Admin"]
  // #swagger.summary = "Get All Admin (lvl 1) or Manager (lvl 2) records."
  // #swagger.description = "Get All Admin (lvl 1) or Manager (lvl 2) records."
  // #swagger.parameters["op_lvl"] = {description: "The Operator level to filter by."}
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Admin profile."}
  try {
    // console.log(req.session.user);
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .find({ op_lvl: parseInt(req.query.op_lvl, 10) });
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        return parseInt(req.query.op_lvl, 10) === 1
          ? res.status(200).json({ message: "No Administrators to display." }) // Truthy
          : res.status(200).json({ message: "No Managers to display." }); // Falsy (default) // Should we use 200 or 404 if nothing found in collection for getAll()?
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resArr);
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Attempts to create a new admin (op_lvl 1) or manager (op_lvl 2) account,
 * or returns errors if they are encountered.
 */
const createAdmin = async (req, res, next) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  // #swagger.tags = ["Admin"]
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaAdminRequired"
        }
      }
    }
  } */
  // #swagger.summary = "Create a new Admin (lvl 1 or 2) record."
  // #swagger.description = "Create a new Admin (lvl 1 or 2) record."
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Admin profile."}
  try {
    const adminBody = {
      displayName: req.body.displayName,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      op_lvl: req.body.op_lvl,
      creationDate: new Date().toLocaleDateString(),
      profilePicURI: req.body.profilePicURI
    };
    console.log(req.session.user);
    const adminData = await adminPOSTSchema.validateAsync(adminBody, {
      allowUnknown: true
    });
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .insertOne(adminData);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

/**
 * Attempts to update a record with `req.body` fields
 */
const updateAdmin = async (req, res, next) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  // #swagger.tags = ["Admin"]
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaAdminOptional"
        }
      }
    }
  } */
  // #swagger.summary = "Update Admin/Manager record, ref'd by _id, with optional fields."
  // #swagger.description = "Update Admin/Manager record, ref'd by _id, with optional fields."
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Admin profile."}
  try {
    const ID = createObjectId(req.params.id);

    const adminBody = {
      displayName: req.body.displayName,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      op_lvl: req.body.op_lvl,
      profilePicURI: req.body.profilePicURI
    };
    const adminData = await adminPUTSchema.validateAsync(adminBody);
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .findOneAndUpdate(
        { _id: ID },
        {
          $set: adminData
        },
        { returnDocument: "after" } // Use this setup for updating fields within record.
      );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const deleteAdmin = async (req, res, next) => {
  // TODO: implement admin creation, permission handling for op-lvl 1
  // #swagger.tags = ["Admin"]
  // #swagger.summary = "Delete Admin/Manager record, ref'd by _id, with optional fields."
  // #swagger.description = "Delete Admin/Manager record, ref'd by _id, with optional fields."
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Admin profile."}
  try {
    const ID = createObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("admin")
      .deleteOne({ _id: ID });
    res.setHeader("Content-Type", "application/json");
    if (result.deletedCount === 0) {
      res
        .status(200)
        .json({
          message: `Nothing to delete by ID ${req.params.id.toLowerCase()}.`
        }); // Falsy (default) // Should we use 200 or 404 if nothing found in collection for deleteAdmin()?
      return;
    }
    res
      .status(200)
      .json({
        message: `Successfully deleted Admin/Manager record with ID ${ID}.`
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
