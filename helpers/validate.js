/**
 * A JOI validation schema for `req.body` in '/api-docs'
 * Contains schema for admin, user, inventory, and order records.
 */

const Joi = require("joi");

const adminPOSTSchema = Joi.object().keys({
  displayName: Joi.string()
    .trim()
    .lowercase()
    .required()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"displayName\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  email: Joi.string().trim().lowercase().required().email().min(7),
  op_lvl: Joi.number().integer().required().min(1).max(2),
  fname: Joi.string()
    .trim()
    .lowercase()
    .required()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"fname\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  lname: Joi.string()
    .optional()
    .trim()
    .lowercase()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"lname\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  profilePic: Joi.string().optional().trim().uri() // may not need to check for this as some Google accounts have a default pic.
});

const adminPUTSchema = Joi.object().keys({
  displayName: Joi.string()
    .empty("")
    .trim()
    .lowercase()
    .min(2)
    .regex(/^[a-zA-Z.'_-]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"displayName\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  email: Joi.string().empty("").trim().lowercase().email().min(7),
  op_lvl: Joi.number().empty("").integer().min(1).max(2),
  fname: Joi.string()
    .empty("")
    .trim()
    .lowercase()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"fname\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  lname: Joi.string()
    .empty("")
    .trim()
    .lowercase()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"lname\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  profilePicURI: Joi.string().empty("").trim().uri() // may not need to check for this as some Google accounts have a default pic.
});

const userSchema = Joi.object().keys({
  displayName: Joi.string()
    .trim()
    .lowercase()
    .required()
    .min(2)
    .regex(/^[a-zA-Z.'_-\s]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"displayName\" must contain only English letters, numbers, periods, underscores, apostrophes, single-spaces, and hyphens."
    }),
  email: Joi.string().trim().lowercase().required().email().min(7),
  profilePic: Joi.string().optional().trim().uri() // may not need to check for this as some Google accounts have a default pic.
});

const inventoryPOSTSchema = Joi.object().keys({
  productName: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().required()
});

const inventoryPUTSchema = Joi.object().keys({
  productName: Joi.string().empty("").trim(),
  description: Joi.string().empty("").trim(),
  price: Joi.number().integer().empty(""),
  stock: Joi.number().integer().empty("")
});

const orderSchema = Joi.object().keys({
  userDisplayName: Joi.string()
    .trim()
    .lowercase()
    .required()
    .min(2)
    .regex(/^[a-zA-Z.'_-]+$/)
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"displayName\" must contain only English letters, numbers, periods, underscores, and hyphens."
    }),
  date: Joi.date().required().max("now"),
  price: Joi.number().required()
});

module.exports = {
  adminPOSTSchema,
  adminPUTSchema,
  userSchema,
  inventoryPOSTSchema,
  inventoryPUTSchema,
  orderSchema
};
