/**
 * Contains the <root>/inventory/ endpoints/requests.
 */

const router = require("express").Router();

const invController = require("../controllers/inv");
const {isValidId} = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

// get all inventory
router.get("/", invController.getAll);

// get inventory by id
router.get("/:id", isValidId, invController.getById);

// create new inventory
router.post(
  "/", isAuthenticated,
  invController.createItem
);

// update inventory
router.put(
  "/:id",
  /* validation.isValidId, */ isAuthenticated,
  invController.updateItem
);

// delete inventory
router.delete(
  "/:id",
  /* validation.isValidId, */ isAuthenticated,
  invController.deleteItem
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
