/**
 * Contains the <root>/order/ endpoints/requests.
 */

const router = require("express").Router();
const ordersController = require("../controllers/orders");
const { isValidId } = require("../middleware/validation");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");

// Gets All Orders, only admins should be able to see?
router.get("/", isAuthenticated, isAdmin, ordersController.getAll);

// Get order by id
router.get("/:id", isAuthenticated, isValidId, ordersController.getOrderById);

// Get all orders placed by a user by user ID
router.get(
  "/user/:id",
  isAuthenticated,
  isValidId,
  ordersController.getAllOrdersByUserId
);

// Place a new order
router.post("/", isAuthenticated, ordersController.createOrder);

// Updates an order based on order ID
router.put("/:id", isAuthenticated, isValidId, ordersController.updateOrder);

// Delete order ID for admin and user who placed order
router.delete("/:id", isAuthenticated, isValidId, ordersController.deleteOrder);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
