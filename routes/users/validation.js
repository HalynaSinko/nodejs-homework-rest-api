const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const {
  ValidLengthUserName,
  ValidLengthPassword,
} = require("../../config/constants");

const patternName = "\\w+\\s\\w+";
const patternPassword = "\\S+";

const schemaSignupUser = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(patternName))
    .min(ValidLengthUserName.MIN_LENGTH)
    .max(ValidLengthUserName.MAX_LENGTH),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp(patternPassword))
    .min(ValidLengthPassword.MIN_LENGTH)
    .required(),
  subscription: Joi.valid("starter", "pro", "business"),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp(patternPassword))
    .min(ValidLengthPassword.MIN_LENGTH)
    .required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.valid("starter", "pro", "business").required(),
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

module.exports.validateSignupUser = async (req, res, next) => {
  return await validate(schemaSignupUser, req.body, res, next);
};

module.exports.validateLoginUser = async (req, res, next) => {
  return await validate(schemaLoginUser, req.body, res, next);
};

module.exports.validateUpdateSubscription = async (req, res, next) => {
  return await validate(schemaUpdateSubscription, req.body, res, next);
};
