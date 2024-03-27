const express = require("express");

const router = express.Router();

const ordersController = require("../controllers/orders");
// const validation = require('../middleware/validate'); need help with this for JOI
// const {isAuthenticated} = require("../middleware/authenticate"); could use some help on this

router.get("/", /* isAuthenticated, */ ordersController.getAll); // Gets All Orders, only admins should be able to see?
router.get("/:id", /* validation.isValidId, */ ordersController.getById); // Get order by id
router.get("/user/:id", /* validation.isValidId, */ ordersController.getByUser); // Get all orders placed by a user by user ID
router.post("/", /* validation.someSortOfRule, */ ordersController.createOrder); // Place a new order
router.put(
  "/:id",
  /* validation.isValidId, validation.someSortOfRule, isAuthenticated, */ ordersController.updateOrder
); // Updates an order based on order ID
router.delete(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ ordersController.deleteOrder
); // Delete order ID for admin and user who placed order
// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
