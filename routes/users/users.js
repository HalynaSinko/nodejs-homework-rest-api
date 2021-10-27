const express = require("express");
const router = express.Router();

const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubscription,
} = require("./validation");
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
} = require("../../controllers/users.controller");
const guard = require("../../helpers/guard");
const loginLimiter = require("../../helpers/rate-limit");

router.post("/signup", validateSignupUser, signup);
router.post("/login", validateLoginUser, loginLimiter, login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/", guard, validateUpdateSubscription, updateUserSubscription);

module.exports = router;
