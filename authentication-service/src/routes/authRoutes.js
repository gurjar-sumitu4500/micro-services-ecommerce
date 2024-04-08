const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");
const { validateRegistration } = require('../utils/validationHelper');

// Route for user registration
router.post("/register", validateRegistration, registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for user logout
router.post("/logout", logoutUser);

module.exports = router;
