/**
 * Contains the <root>/order/ endpoints/requests.
 */

const router = require("express").Router();

const ordersController = require("../controllers/orders");
// const validation = require('../middleware/validate'); // need help with this for JOI
const {isAuthenticated} = require("../middleware/authenticate");

// Gets All Orders, only admins should be able to see?
router.get("/", isAuthenticated, /* isAdmin, */ ordersController.getAll); 

// Get order by id
router.get("/:id", /* validation.isValidId, */ ordersController.getById); 

// Get all orders placed by a user by user ID
router.get("/user/:id", /* validation.isValidId, */ isAuthenticated, ordersController.getByUser); 

// Place a new order
router.post("/", /* validation.someSortOfRule, */ isAuthenticated, ordersController.createOrder);

// Updates an order based on order ID
router.put(
  "/:id",
  /* validation.isValidId, validation.someSortOfRule, */ isAuthenticated, ordersController.updateOrder
);

// Delete order ID for admin and user who placed order
router.delete(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ ordersController.deleteOrder
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
