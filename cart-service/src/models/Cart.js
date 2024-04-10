// Product.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
