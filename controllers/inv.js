/**
 * Contains functionality for Inventory management.
 */

const { createObjectId } = require("../helpers/utils");
const Inventory = require("../models/inv");
const {
  inventoryPOSTSchema,
  inventoryPUTSchema
} = require("../helpers/validate");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  // #swagger.summary = "Get All Inventory records."
  // #swagger.description = "Get All Inventory records."
  // #swagger.responses[200] = {description: "OK: Inventory records were successfully pulled."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while pulling the Inventory records."}
  try {
    const result = await Inventory.find({});
    res.setHeader("Content-Type", "application/json");
    if (result.length === 0) {
      res.status(404).json({ message: "No inventory to display." }); // Use 404 if nothing found in collection
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const createItem = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaInventoryRequired"
        }
      }
    }
  } */
  // #swagger.summary = "Create a new Inventory record."
  // #swagger.description = "Create a new Inventory record."
  // #swagger.responses[200] = {description: "OK: Inventory record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin/Manager account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin/Manager account with the appropriate privileges."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Inventory record."}
  try {
    const invBody = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    };
    console.log(invBody);
    const invData = await inventoryPOSTSchema.validateAsync(invBody, {
      allowUnknown: true
    });
    const result = await new Inventory(invData);
    result.save().then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaInventoryOptional"
        }
      }
    }
  } */
  // #swagger.summary = "Update an Inventory record by ID, with optional fields."
  // #swagger.description = "Update an Inventory record by ID, with optional fields."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Inventory record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin/Manager account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin/Manager account with the appropriate privileges."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while updating the Inventory record."}
  // res.status(200).json({ message: "Inventory PUT request" })
  try {
    const ID = createObjectId(req.params.id);

    const invBody = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock
    };

    const invData = await inventoryPUTSchema.validateAsync(invBody);
    const result = await Inventory.findOneAndUpdate(
      { _id: ID },
      {
        $set: invData
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

const deleteItem = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  // #swagger.summary = "Delete an Inventory record by ID."
  // #swagger.description = "Delete an Inventory record by ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Inventory record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin/Manager account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin/Manager account with the appropriate privileges."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Inventory record."}
  try {
    const ID = createObjectId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    const result = await Inventory.deleteOne({ _id: ID });
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: `Nothing to delete by ID ${ID}.`
      }); // Use 404 if nothing found in collection
      return;
    }
    res.status(200).json({
      message: `Successfully deleted Inventory record with ID ${ID}.`
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  // #swagger.summary = "Get inventory items by Object ID."
  // #swagger.description = "Get inventory items by Object ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Inventory item was successfully received."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while requesting the Inventory item."}
  try {
    const ID = createObjectId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    const result = await Inventory.find({ _id: ID });
    if (result.length === 0) {
      res.status(404).json(`No inventory item found with ID ${ID}`); // Use 404 if nothing found in collection
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteItem
};
