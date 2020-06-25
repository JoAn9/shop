const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// @route    POST /cart
// @desc     Add product to cart
router.post('/', async (req, res) => {
  const { _id, quantity } = req.body;

  try {
    const cart = new Cart(req.session.cart);
    cart.add(_id, quantity);
    req.session.cart = cart;
    return res.status(201).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @route    GET /cart
// @desc     Get cart
router.get('/', async (req, res) => {
  try {
    const cart = new Cart(req.session.cart);
    await cart.getAllProduct();
    res.status(200).json(cart.productsArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// @route    DELETE /cart
// @desc     Delete product from cart
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const cart = new Cart(req.session.cart);
    cart.removeFromCart(id);
    req.session.cart = cart;
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
