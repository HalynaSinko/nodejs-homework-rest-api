const rateLimit = require("express-rate-limit");

const {
  HttpCode,
  VariablesRateLimit,
  ConstantsRateLimit,
} = require("../config/constants");

const limiter = rateLimit({
  windowMs:
    VariablesRateLimit.QTY_NEEDED_MINUTES *
    ConstantsRateLimit.QTY_SECONDS_IN_MINUTE *
    ConstantsRateLimit.QTY_MILLISECONDS_IN_SECOND, // 15 minutes
  max: VariablesRateLimit.MAX_QTY_REQUESTS_FROM_EACH_IP, // limit each IP to 100 requests per windowMs
  hendler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: "error",
      code: HttpCode.TOO_MANY_REQUESTS,
      message: "Too many requests",
    });
  },
});

module.exports = limiter;
