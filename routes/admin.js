/**
 * Contains the <root>/admin/ endpoints/requests with appropriate validations.
 */

const router = require("express").Router();
const adminController = require("../controllers/admin");
const { isValidId, isValidLevel } = require("../middleware/validation");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");

// Get all of the admins/managers on the account, only (op_lvl 1 and 2) should be able to see.
router.get("/", isAuthenticated, isAdmin, isValidLevel, adminController.getAll);

// Create new admin/manager in record
router.post("/", isAuthenticated, isAdmin, adminController.createAdmin);

// Update to admin/manager by ID
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  isValidId,
  adminController.updateAdmin
);

// Delete admin/manager by ID
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  isValidId,
  adminController.deleteAdmin
);

// gotta implement valid and auth
// validation needs rules for Post and Put, and isValidId for get/put/delete with ID

module.exports = router;
