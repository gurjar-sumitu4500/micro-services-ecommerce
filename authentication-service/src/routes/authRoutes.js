const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validationResult } = require('express-validator');
const { validateOAuthParams } = require('../middlewares/authMiddleware');
const { createAuthorizationCode } = require('../services/authService');
const AuthorizationCode = require('../models/AuthorizationCode');
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');
const { validateClient, validateRegistration } = require('../utils/validationHelper');

// Route for user registration
router.post("/register", validateRegistration, registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for user logout
router.post("/logout", logoutUser);

module.exports = router;
