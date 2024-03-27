const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users");
// const validation = require('../middleware/validate'); need help with this for JOI
// const {isAuthenticated} = require("../middleware/authenticate"); could use some help on this

router.get("/", /* isAuthenticated, */ usersController.getAll); // Get all users
router.get(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ usersController.getUserById
); // Get user by id
router.post("/register", usersController.createUser); // Create a new user
router.post("/login", usersController.login); // Login as a new user -- unsure how this works right now
router.put(
  "/:id",
  /* validation.isValidId, validation.someSortOfRule, isAuthenticated, */ usersController.updateUser
); // Update user if authenticated as admin or user
router.delete(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ usersController.deleteUser
); // Delete user by ID
// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
