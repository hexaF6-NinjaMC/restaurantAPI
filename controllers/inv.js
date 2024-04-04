const { createObjectId } = require("../helpers/utils");
const mongodb = require("../data/database");
const {
  inventoryPOSTSchema,
  inventoryPUTSchema
} = require("../helpers/validate");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  // #swagger.summary = "Get All Inventory records."
  // #swagger.description = "Get All Inventory records."
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("inventory")
      .find();
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "No inventory to display." }); // Should use 200 or 404 if nothing found in collection for getAll()?
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
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("inventory")
      .insertOne(invData);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
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
  // #swagger.summary = "Update an Inventory record."
  // #swagger.description = "Update an Inventory record."
  // #swagger.responses[200] = {description: "OK: Inventory record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin/Manager account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin/Manager account with the appropriate privileges."}
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
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("inventory")
      .findOneAndUpdate(
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
  // #swagger.summary = "Delete an Inventory record."
  // #swagger.description = "Delete an Inventory record."
  // #swagger.responses[200] = {description: "OK: Inventory record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in with an Admin/Manager account."}
  // #swagger.responses[403] = {description: "Forbidden: You must be logged in with an Admin/Manager account with the appropriate privileges."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Inventory record."}
  try {
    const ID = createObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("inventory")
      .deleteOne({ _id: ID });
    if (result.deletedCount > 0) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(200)
        .json({ message: `Deleted inventory item by ID ${req.params.id}` });
    } else {
      res.setHeader("Content-Type", "application/json");
      res
        .status(500)
        .json({ message: `Nothing to delete by ID ${req.params.id}.` }); // Falsy(default) // Should we use 200 or 404 if nothing found in collection for deleteAdmin()?
    }
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
  // #swagger.summary = "Get inventory items by Object ID."
  // #swagger.description = "Get inventory items by Object ID."
  // #swagger.responses[200] = {description: "OK: Inventory item was successfully received."}
  // #swagger.responses[404] = {description: "Error: No inventory item found with id provided"}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while requesting the Inventory item."}
  try {
    const ID = createObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db("Restaurant")
      .collection("inventory")
      .find({ _id: ID });
    result.toArray().then((invArr) => {
      if (invArr.length === 0) {
        res.status(404).json(`No inventory item found with id ${ID}`);
      }
      res.status(200).json(invArr[0]);
    });
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
