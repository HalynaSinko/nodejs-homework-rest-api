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
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users.controller");
const guard = require("../../helpers/guard");
const loginLimiter = require("../../helpers/rate-limit");
const uploud = require("../../helpers/uploads");
const wrapError = require("../../helpers/errorHandler");

router.post("/signup", validateSignupUser, wrapError(signup));
router.post("/login", validateLoginUser, loginLimiter, wrapError(login));
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);
router.patch("/", guard, validateUpdateSubscription, updateUserSubscription);
router.patch("/avatar", guard, uploud.single("avatar"), uploadAvatar);

router.get("/verify/:verifyToken", wrapError(verifyUser));
router.post("/verify", wrapError(repeatEmailForVerifyUser));

module.exports = router;
