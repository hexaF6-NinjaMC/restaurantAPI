/**
 * Contains authentication routes for '/user' and '/admin'
 */

const passport = require("passport");
const router = require("express").Router();

/* ================================================================= */

/**
 * Admin auth routes
 */
router.get(
  "/admin/login",
  passport.authenticate("admin", { scope: ["profile", "email"] })
);

router.get(
  // #swagger.ignore = true
  "/admin/logout",
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
);

// Admin - Success
router.get(
  // #swagger.ignore = true
  "/admin/success",
  (req, res) => {
    res.sendFile("success.html", { root: "./frontend" });
  }
);

/* ================================================================= */

/**
 * User auth routes
 */
router.get(
  "/user/login",
  passport.authenticate("user", { scope: ["profile", "email"] })
);

router.get("/user/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// User - Success
router.get(
  // #swagger.ignore = true
  "/user/success",
  (req, res) => {
    res.sendFile("success.html", { root: "./frontend" });
  }
);

module.exports = router;
