const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, cartController.createCart);

router.get('/get', authMiddleware, cartController.getCart);

router.post('/addToCart', authMiddleware, cartController.addToCart);

router.post('/delete/:cartId', authMiddleware, cartController.deleteCart);

module.exports = router;
