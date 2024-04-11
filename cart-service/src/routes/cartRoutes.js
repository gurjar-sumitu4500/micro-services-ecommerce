const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/create', cartController.createCart);

router.get('/get', cartController.getCart);

router.post('/addToCart', cartController.addToCart);

router.post('/delete/:cartId', cartController.deleteCart);

module.exports = router;
