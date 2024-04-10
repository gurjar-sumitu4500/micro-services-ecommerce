const Cart = require('../models/Cart');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createCart = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const cart = new Cart({
      userId: new ObjectId(userId),
      products: JSON.stringify([]),
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

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    const prevCart = await Cart.find({ _id: cartId });
    let updatedProducts = (JSON.parse(prevCart?.products).concat(products)).reduce((acc, curr) => {
      if (curr?.productId in acc) {
        acc[curr?.productId].count += 1;
      } else {
        acc[curr?.productId].count = 1;
      }
      return acc[curr?.productId];
    }, []);

    let updatedVersion = prevCart?.version + 1;
    let updatedAmount = prevCart?.amount + (products.reduce((a, c) => a + c.price, 0) || 0);

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { products: JSON.stringify(updatedProducts), version: updatedVersion, amount: updatedAmount }
    );
    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error updating Cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const deletedCart = await Cart.findByIdAndDelete({ _id: cartId });
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
