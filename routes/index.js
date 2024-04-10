/**
 * Contains all root (server) routes for the application:
 * <domain>/auth, <domain>/admin, <domain>/user, <domain>/order, <domain>/inventory
 */

const router = require("express").Router();

router.get(
  // #swagger.ignore = true
  "/",
  async (req, res) => {
    res.send("Restaurant API");
  }
);

router.use("/", require("./swagger"));

// prefix </admin and /user> with /auth
router.use("/auth", require("./auth"));

router.use("/admin", require("./admin"));
router.use("/user", require("./users"));
router.use("/order", require("./orders"));
router.use("/inventory", require("./inv"));

module.exports = router;
