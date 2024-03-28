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
  res.status(200).json({ message: "Admin POST reuest" });
};

const updateOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  res.status(200).json({ message: "Admin PUT reuest" });
};

const deleteOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  res.status(200).json({ message: "Admin DELETE reuest" });
};

const getOrderById = async (req, res) => {
  // #swagger.tags = ['Orders']
  res.status(200).json({ message: "OrderById GET reuest" });
};

const getAllOrdersByUserId = async (req, res) => {
  // #swagger.tags = ['Orders']
  res.status(200).json({ message: "AllOrdersByUserId GET reuest" });
};

module.exports = {
  getAll,
  getOrderById,
  getAllOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder
};
