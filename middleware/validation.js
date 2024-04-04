/**
 * Performs req.params checks to ensure the input is within valid constraints
 */

const { isObjectIdOrHexString } = require("mongoose");

/**
 * Checks if the input is a valid default MongoDB ObjectId (24 char HexString).
 * If `False`, responds with an HTTP 400 (Bad Request) response and stops, otherwise continues processing.
 */
const isValidId = (req, res, next) => {
  if (
    !isObjectIdOrHexString(req.params.id) &&
    !isObjectIdOrHexString(req.query.user_id)
  ) {
    res
      .status(400)
      .json("Must use a valid hexstring ID to find a that record.");
    return;
  }
  next();
};

/**
 * Checks if the input (appears after `?<param>=`) is an op_lvl of either 1 or 2.
 * If `False` (Where both checks are `False`), responds with an HTTP 400 (Bad Request) response and stops, otherwise continues processing.
 */
const isValidLevel = (req, res, next) => {
  if (
    parseInt(req.query.op_lvl, 10) !== 1 &&
    parseInt(req.query.op_lvl, 10) !== 2
  ) {
    res
      .status(400)
      .json("Must query with '1' or '2' to find that information.");
    return;
  }
  next();
};

module.exports = {
  isValidId,
  isValidLevel
};
