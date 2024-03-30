// TO BE IMPLEMENTED
// - AUSTIN

const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  try {
    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .find();
    result.toArray().then((resArr) => {
      if (resArr.length === 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "No orders to display." }); // Should use 200 or 404 if nothing found in collection for getAll()?
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

const createOrder = async (req, res) => {
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
  // #swagger.responses[200] = {description: "OK: Admin record was successfully created."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while creating the Order record."}
  res.status(200).json({ message: "Order POST request" });
};

const updateOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Updated Order record, with optional fields."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[422] = {description: "Unprocessable Entity: Data is not valid."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while updating the Order record."}
  res.status(200).json({ message: "Order PUT request" });
};

const deleteOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Delete Order record."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Order record."}
  res.status(200).json({ message: "Order DELETE request" });
};

const getOrderById = async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get Order record by ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully retrieved."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order record."}
  res.status(200).json({ message: "OrderById GET request" });
};

const getAllOrdersByUserId = async (req, res) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get Order record by USER_ID."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully retrieved."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order record."}
  res.status(200).json({ message: "AllOrdersByUserId GET request" });
};

module.exports = {
  getAll,
  getOrderById,
  getAllOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder
};
