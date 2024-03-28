/**
 * Contains all root (server) routes for the application:
 * <domain>/auth, <domain>/admin, <domain>/user, <domain>/order, <domain>/inventory
 */

// const passport = require("passport");
const router = require("express").Router();
const { strategies } = require("../middleware/passport-strategies");

// Use passport strategies (AKA "call them")
strategies();

router.use("/", require("./swagger"));

router.use("/admin", require("./admin"));
// router.use("/user", require("./users"));
// router.use("/order", require("./orders"));
// router.use("/inventory", require("./inv"));

// LOGIN - LOGOUT may not be correct?

router.use("/auth", require("./auth"));

module.exports = router;
