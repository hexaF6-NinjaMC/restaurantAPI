// TO BE IMPLEMENTED
// - AUSTIN

const mongodb = require("../data/database");

const getAll = async (req, res, next) => {
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

const createInventory = async (req, res) => {
  res.status(200).json({ message: "Inventory POST reuest" });
};

const updateInventory = async (req, res) => {
  res.status(200).json({ message: "Inventory PUT reuest" });
};

const deleteInventory = async (req, res) => {
  res.status(200).json({ message: "Inventory DELETE reuest" });
};

module.exports = {
  getAll,
  createInventory,
  updateInventory,
  deleteInventory
};
