const ValidLengthContactName = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 30,
};

const ValidLengthUserName = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 30,
};

const ValidLengthPassword = {
  MIN_LENGTH: 6,
};

const StatusSubscription = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUESR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const VariablesRateLimit = {
  QTY_NEEDED_MINUTES: 15,
  MAX_QTY_REQUESTS_FROM_EACH_IP: 3,
  LIMIT_SIZE: 10000,
};

const ConstantsRateLimit = {
  QTY_SECONDS_IN_MINUTE: 60,
  QTY_MILLISECONDS_IN_SECOND: 1000,
};

module.exports = {
  ValidLengthContactName,
  ValidLengthUserName,
  ValidLengthPassword,
  StatusSubscription,
  HttpCode,
  VariablesRateLimit,
  ConstantsRateLimit,
};
