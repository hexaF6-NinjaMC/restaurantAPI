/**
 * Contains functionality for admin/manager operators.
 */

const { createObjectId } = require("../helpers/utils");
const Admin = require("../models/admin");
const { adminPOSTSchema, adminPUTSchema } = require("../helpers/validate");

/**
 * Retrieves results from record based on the `req.params.op_lvl`.
 */
const getAll = async (req, res, next) => {
  // #swagger.tags = ["Admin"]
  // #swagger.summary = "Get All Admin (lvl 1) or Manager (lvl 2) records."
  // #swagger.description = "Get All Admin (lvl 1) or Manager (lvl 2) records."
  /* #swagger.parameters["op_lvl"] = {
    description: "The Operator level to filter by.",
    required: true
  } */
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while retrieving the Admin profiles."}
  try {
    res.setHeader("Content-Type", "application/json");
    const result = await Admin.find({ op_lvl: parseInt(req.query.op_lvl, 10) });
    if (result.length === 0) {
      return parseInt(req.query.op_lvl, 10) === 1
        ? res.status(200).json({ message: "No Administrators to display." }) // Truthy
        : res.status(200).json({ message: "No Managers to display." }); // Falsy (default) // Use 200 if nothing found in collection
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Attempts to create a new admin (op_lvl 1) or manager (op_lvl 2) account,
 * or returns errors if they are encountered.
 */
const createAdmin = async (req, res, next) => {
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
    const adminData = await adminPOSTSchema.validateAsync(adminBody, {
      allowUnknown: true
    });
    const result = await new Admin(adminData);
    result.save().then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

/**
 * Attempts to update a record with `req.body` fields
 */
const updateAdmin = async (req, res, next) => {
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
  // #swagger.summary = "Update Admin/Manager record by ID, with optional fields."
  // #swagger.description = "Update Admin/Manager record by ID, with optional fields."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Admin record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while updating the Admin profile."}
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
    const result = await Admin.findOneAndUpdate(
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
  // #swagger.tags = ["Admin"]
  // #swagger.summary = "Delete Admin/Manager record by ID."
  // #swagger.description = "Delete Admin/Manager record by ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin account with the appropriate privileges."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Admin profile."}
  try {
    const ID = createObjectId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    const result = await Admin.deleteOne({ _id: ID });
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: `Nothing to delete by ID ${ID}.`
      }); // Use 404 if nothing found in collection
      return;
    }
    res.status(200).json({
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
