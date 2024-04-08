// productRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route for creating a new product
router.post('/add', authMiddleware, cartController.createCart);

// Route for retrieving all products
router.get('/get', authMiddleware, cartController.getCart);

// Route for updating a product
router.post('/update/:id', authMiddleware, cartController.addToCart);

// Route for deleting a product
router.post('/delete/:id', authMiddleware, cartController.deleteCart);

module.exports = router;
