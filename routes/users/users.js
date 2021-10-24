const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../../controllers/users.controller");
const guard = require("../../helpers/guard");

// const {
//   validateContact,
//   validateContactId,
//   validateStatusContact,
// } = require("./validation");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", guard, logout);
router.get("/current", guard, getCurrentUser);

module.exports = router;
