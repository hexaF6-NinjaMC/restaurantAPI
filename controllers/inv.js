// TO BE IMPLEMENTED
// - AUSTIN

const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
  // #swagger.tags = ['Inventory']
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

const createItem = async (req, res) => {
  // #swagger.tags = ['Inventory']
  res.status(200).json({ message: "Inventory POST request" });
};

const updateItem = async (req, res) => {
  // #swagger.tags = ['Inventory']
  res.status(200).json({ message: "Inventory PUT request" });
};

const deleteItem = async (req, res) => {
  // #swagger.tags = ['Inventory']
  res.status(200).json({ message: "Inventory DELETE request" });
};

const getById = async (req, res) => {
  // #swagger.tags = ['Inventory']
  res.status(200).json({ message: "Inventory GET by ID request" });
};

module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteItem
};
