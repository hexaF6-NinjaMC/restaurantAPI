/**
 * Contains the authentication method for the OAuth2 user.
 * > Returns either a 401 (Unauthorized) status or proceeds to use the Express application.
 */

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You do not have access.");
  }
  next();
};

module.exports = {
  isAuthenticated
};
