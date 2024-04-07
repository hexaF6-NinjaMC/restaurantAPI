/**
 * Contains functionality for Order management.
 */

const { createObjectId } = require("../helpers/utils");
const Order = require("../models/orders");
const { orderPUTSchema, orderPOSTSchema } = require("../helpers/validate");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get All Order records."
  // #swagger.description = "Get All Order records."
  // #swagger.responses[200] = {description: "OK: Order records were successfully pulled."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while pulling the Order record."}
  try {
    res.setHeader("Content-Type", "application/json");
    const result = await Order.find({});
    if (result.length === 0) {
      res.status(200).json({ message: "No orders to display." }); // Should use 200 if nothing found in collection for getAll()
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaOrderRequired"
        }
      }
    }
  } */
  // #swagger.summary = "Create Order record, with optional fields."
  // #swagger.description = "Create Order record, with optional fields."
  /* #swagger.parameters["userID"] = {
    description: "User ID to be associated with the order.",
    required: true
  } */
  // #swagger.responses[200] = {description: "OK: Order record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Order record."}
  try {
    const ID = createObjectId(req.query.userID);
    const orders = {
      userID: ID,
      itemName: req.body.itemName,
      amount: req.body.amount
    };

    // Validate
    const orderData = await orderPOSTSchema.validateAsync(orders, {
      allowUnknown: true
    });
    const result = await new Order(orderData);
    result.save().then(() => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  /* #swagger.requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/schemaOrderOptional"
        }
      }
    }
  } */
  // #swagger.summary = "Update Order record, with optional fields."
  // #swagger.description = "Update Order record, with optional fields."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while updating the Order record."}
  try {
    const ID = createObjectId(req.params.id);
    const orders = {
      userID: ID,
      itemName: req.body.itemName,
      amount: req.body.amount
    };

    // Validate
    const orderData = await orderPUTSchema.validateAsync(orders, {
      allowUnknown: true
    });

    const response = await Order.findOneAndUpdate(
      { _id: ID },
      { $set: orderData },
      { returnDocument: "after" }
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Delete Order record by ID."
  // #swagger.description = "Delete Order record by ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Order record."}
  try {
    const ID = createObjectId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    const result = await Order.deleteOne({ _id: ID });
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: `Nothing to delete by ID ${ID}.`
      }); // Use 404 if nothing found in collection
      return;
    }
    res.status(200).json({
      message: `Successfully deleted Order record with ID ${ID}.`
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get Order record by ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully retrieved."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order record."}
  try {
    const ID = createObjectId(req.params.id);

    const response = await Order.find({ _id: ID });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const getAllOrdersByUserId = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get Order record by USER_ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order records were successfully retrieved."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[404] = {description: "Not Found: Could not find a record with that ID."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order records."}
  try {
    const ID = createObjectId(req.params.id);

    res.setHeader("Content-Type", "application/json");
    const result = await Order.find({ userID: ID });
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: `No orders to display by User ID ${ID}.` }); // Use 404 if nothing found in collection
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOrderById,
  getAllOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder
};
