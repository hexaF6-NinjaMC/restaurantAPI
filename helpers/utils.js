/**
 * Contains general helper functions to use throughout API
 */

/**
 * Creates a new MongoDB ObjectID
 */
const createObjectId = require("mongodb").ObjectId.createFromHexString;

module.exports = {
  createObjectId
};
