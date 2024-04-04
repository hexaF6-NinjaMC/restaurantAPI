// TO BE IMPLEMENTED
// - AUSTIN

const mongodb = require("../data/database");
const { orderPUTSchema, orderPOSTSchema } = require("../helpers/validate");
const { createObjectId } = require("../helpers/utils");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Get All Order records."
  // #swagger.description = "Get All Order records."
  // #swagger.responses[200] = {description: "OK: Order records were successfully pulled."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while pulling the Order record."}
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
  // #swagger.parameters["userID"] = {description: "YOU BORKED IT! GAME OVER MAN!"}
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

    const response = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .insertOne(orderData);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  // #swagger.tags = ['Orders']
  // #swagger.summary = "Updated Order record, with optional fields."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully updated."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
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

    const response = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .findOneAndUpdate(
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
  // #swagger.summary = "Delete Order record."
  // #swagger.parameters["id"] = {description: "hexadecimal string 24 character"}
  // #swagger.responses[200] = {description: "OK: Order record was successfully deleted."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while deleting the Order record."}
  try {
    const ID = createObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .deleteOne({ _id: ID });
    res.setHeader("Content-Type", "application/json");
    if (result.deletedCount === 0) {
      res.status(200).json({
        message: `Nothing to delete by ID ${req.params.id.toLowerCase()}.`
      }); // Falsy (default) // Should we use 200 or 404 if nothing found in collection for deleteAdmin()?
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
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order record."}
  try {
    const ID = createObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .findOne({ _id: ID });
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
  // #swagger.responses[200] = {description: "OK: Order record was successfully retrieved."}
  // #swagger.responses[401] = {description: "Unauthorized: You must be logged in."}
  // #swagger.responses[500] = {description: "Internal Server Error: Something happened on the server side while obtaining the Order record."}
  try {
    const ID = createObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db("Restaurant")
      .collection("order")
      .find({ userID: ID });
    console.log(response.length);
    response.toArray().then((resArr) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(resArr);
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
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
