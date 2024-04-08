// productController.js

const Cart = require('../models/Cart');
const jwt = require("jsonwebtoken");

// Controller function to handle product creation
exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = new Cart({
      cartId: new ObjectID(),
      userId,
      products: [],
      totalAmount: 0,
      version: 0
    })
    await cart.save();
    res.status(201).json({ message: 'Cart Created Successfully!', cart });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle product retrieval
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle product update
exports.addToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    const prevCart = await Cart.find({ cartId });
    let newCart = { //TODO
      ...prevCart,
      products: [
        ...products
      ]
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle product deletion
exports.deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
