const { HttpCode } = require("../config/constants");

const wrapError = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (error) {
    switch (error.name) {
      case "ValidationError":
        res.status(HttpCode.BAD_REQUESR).json({
          status: "error",
          code: HttpCode.BAD_REQUESR,
          message: error.message,
        });
        break;
      case "CastomError":
        res.status(error.status).json({
          status: "error",
          code: error.status,
          message: error.message,
        });
        break;

      default:
        next(error);
        break;
    }
  }
};

module.exports = wrapError;
