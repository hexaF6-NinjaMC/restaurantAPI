/**
 * A JOI validation schema for `req.body` in '/api-docs'
 */

const Joi = require("joi");

const adminSchema = Joi.object().keys({
  displayName: Joi.string()
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
  email: Joi.string().trim().lowercase().required().email().min(7),
  level: Joi.number().integer().required().min(1).max(2),
  fname: Joi.string()
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
  lname: Joi.string()
    .trim()
    .lowercase()
    .min(2)
    .regex(/^[a-zA-Z.'_-]+$/)
    .optional()
    .messages({
      "string.min": "\"displayName\" must be at least 2 characters long.",
      "string.pattern.base":
        "\"displayName\" must contain only English letters, numbers, periods, underscores, and hyphens."
    }),
  created: Joi.date().required().max("now"),
  profilePic: Joi.string().trim().uri().optional() // may not need to check for this as some Google accounts have a default pic.
});

const userSchema = Joi.object().keys({
  displayName: Joi.string()
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
  email: Joi.string().trim().lowercase().required().email().min(7),
  created: Joi.date().required().max("now"),
  profilePic: Joi.string().trim().uri().optional() // may not need to check for this as some Google accounts have a default pic.
});

const inventorySchema = Joi.object().keys({
  productName: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().required()
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
  adminSchema,
  userSchema,
  inventorySchema,
  orderSchema
};
