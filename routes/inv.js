/**
 * Contains the <root>/inventory/ endpoints/requests.
 */

const express = require("express");

const router = express.Router();

const invController = require("../controllers/inv");
// const validation = require('../middleware/validation'); need help with this for JOI
const {isAuthenticated} = require("../middleware/authenticate");

// get all inventory
router.get("/", invController.getAll);

// get inventory by id
router.get("/:id", /* validation.isValidId, */ invController.getById);

// create new inventory
router.post(
  "/",
  /* validation.someSortOfRule, */ isAuthenticated, invController.createItem
);

// update inventory
router.put(
  "/:id",
  /* validation.isValidId, */ isAuthenticated, invController.updateItem
);

// delete inventory
router.delete(
  "/:id",
  /* validation.isValidId, */ isAuthenticated, invController.deleteItem
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
