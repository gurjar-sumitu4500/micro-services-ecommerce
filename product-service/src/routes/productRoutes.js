// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Route for creating a new product
router.post('/add', authMiddleware, productController.createProduct);

// Route for retrieving all products
router.get('/get', authMiddleware, productController.getProducts);

// Route for updating a product
router.post('/update/:id', authMiddleware, productController.updateProduct);

// Route for deleting a product
router.post('/delete/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
