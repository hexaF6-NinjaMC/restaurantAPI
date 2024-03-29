/**
 * Returns a 401 (Unauthorized) status or proceeds to use the Express application.
 */
const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You do not have access.");
  }
  next();
};

/**
 * Returns a 403 (Forbidden) status or proceeds to use the Express application.
 */
const isAdmin = (req, res, next) => {
  // Some checking is done here "server"-side in case of spoofing attempts by a bad actor.
  if (
    req.session.user.op_lvl !== 1 &&
    req.session.user.op_lvl !== 2 &&
    req.session.user.op_lvl === undefined
  ) {
    return res
      .status(403)
      .json("You do not have permission to use that resource/method.");
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin
};
