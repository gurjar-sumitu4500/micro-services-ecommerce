// productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for creating a new product
router.post('/add', productController.createProduct);

// Route for retrieving all products
router.get('/get', productController.getProducts);

// Route for updating a product
router.post('/update/:id', productController.updateProduct);

// Route for deleting a product
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;
