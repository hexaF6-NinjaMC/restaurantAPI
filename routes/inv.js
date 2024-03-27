const express = require("express");

const router = express.Router();

const invController = require("../controllers/inv");
// const validation = require('../middleware/validate'); need help with this for JOI
// const {isAuthenticated} = require("../middleware/authenticate"); could use some help on this

router.get("/", invController.getAll); // get all inventory
router.get("/:id", /* validation.isValidId, */ invController.getById); // get inventory by id
router.post(
  "/",
  /* validation.someSortOfRule, isAuthenticated, */ invController.createItem
); // create new inventory
router.put(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ invController.updateItem
); // update inventory
router.delete(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ invController.deleteItem
); // delete inventory
// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
