// Product.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: false,

  cartId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  userId: {
    type: String,
    required: true
  },

  products: {
    type: String
  },

  amounts: {
    type: String
  },

  version: {
    type: Number
  }
});

module.exports = mongoose.model('Cart', cartSchema);
