const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", registerUser); // Register endpoint
router.post("/login", loginUser); // Login endpoint
router.post("/logout", logoutUser); // Logout endpoint
router.get("/check-session", checkSession); // Session validation endpoint

module.exports = router;
