
/**
 * Contains the <root>/user/ endpoints/requests.
 */

const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users");
// const validation = require('../middleware/validate'); // need help with this for JOI
const {isAuthenticated} = require("../middleware/authenticate"); // could use some help on this

// Get all users
router.get("/", isAuthenticated, usersController.getAll);

// Get user by id
router.get(
  "/:id",
  /* validation.isValidId, */ isAuthenticated, usersController.getUserById
);

/**
 * ~Aaron: consider removing from routes, as OAuth2 is implemented through <root>/auth/*. Or,
 * may redirect from the OAuth2 success callback to this method, and if already registered, redirect
 * to login endpoint. That should also redirect after successful completion to the <root>/api-docs endpoint.
 * Could use isAuthenticated for that check, as a protection, and if false, redirect to the appropriate
 * OAuth2 endpoint (user by default, can use `Referer` header to obtain that information [Check the spelling: it's only one 'R'!]).
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
 */
// Create a new user
router.post("/register", /* isAuthenticated, */ usersController.createUser);

/**
 * ~Aaron: consider removing from routes, as OAuth2 is implemented through <root>/auth/*. Or,
 * may redirect from the OAuth2 success callback to register method, and if already registered, redirect
 * to this endpoint. This should also redirect after successful completion to the <root>/api-docs endpoint.
 * Could use isAuthenticated for that check, as a protection, and if false, redirect to the appropriate
 * OAuth2 endpoint (user by default, can use `Referer` header to obtain that information [Check the spelling: it's only one 'R'!]).
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer
 */
// Login as a new user -- unsure how this works right now
router.post("/login", /* isAuthenticated, */ usersController.login);

// Update user if authenticated as admin or user
router.put(
  "/:id",
  /* validation.isValidId, validation.someSortOfRule, */ isAuthenticated, usersController.updateUser
);

// Delete user by ID
router.delete(
  "/:id",
  /* validation.isValidId, */ isAuthenticated, usersController.deleteUser
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
