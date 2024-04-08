const express = require("express");
const router = express.Router();
const { getUserProfile, checkAuth } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Protected route for user profile
router.get("/profile", authMiddleware, getUserProfile);
router.post("/checkAuth", authMiddleware, checkAuth);

module.exports = router;
