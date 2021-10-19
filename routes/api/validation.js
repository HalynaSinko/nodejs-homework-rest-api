const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { ValidLengthContactName } = require("../../config/constant");

const patternContact = "^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$";
const patternName = "\\w+\\s\\w+";

const schemaContact = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(patternName))
    .min(ValidLengthContactName.MIN_LENGTH)
    .max(ValidLengthContactName.MAX_LENGTH)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternContact)).required(),
  favorite: Joi.boolean().optional(),
});

// const patternId = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";
// .pattern(new RegExp(patternId))

const schemaContactId = Joi.object({
  contactId: Joi.objectId().required(),
});

const schemaStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${error.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next);
};

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next);
};

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next);
};
