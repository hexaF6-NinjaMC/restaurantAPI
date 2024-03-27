const express = require("express");

const router = express.Router();
const adminController = require("../controllers/admin");
// const validation = require("../helpers/validate"); // need help with this for JOI
const {isAuthenticated} = require("../middleware/authenticate"); // could use some help on this

router.get("/", isAuthenticated, adminController.getAll); // Get all of the admins on the account, only admins should be able to see?
/**
 * testing admin endpoints
 */
router.get(
  "/create",
  /* validation.someSortOfRule */ isAuthenticated, adminController.createAdmin
);
router.get(
  "/update",
  /* validation.someSortOfRule */ isAuthenticated, adminController.updateAdmin
);
router.get(
  "/delete",
  /* validation.someSortOfRule */ isAuthenticated, adminController.deleteAdmin
);

// Create new manager/admin user
router.post("/", /* validation.someSortOfRule */ adminController.createAdmin);

// Update to admin or manager
router.put(
  "/:id",
  /* validation.isValidId, */ /* validation.someSortOfRule, */ /* isAuthenticated, */ adminController.updateAdmin
);

// Delete user by ID
router.delete(
  "/:id",
  /* validation.isValidId, isAuthenticated, */ adminController.deleteAdmin
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
