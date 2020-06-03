const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authToken = require('../middleware/authToken');

// @route    POST /cart
// @desc     Add product to cart
router.post('/', async (req, res) => {
  const { _id, quantity } = req.body;

  try {
    const cart = new Cart(req.session.cart);
    cart.add(_id, quantity);
    req.session.cart = cart;
    console.log('req.session.cart', req.session.cart);
    return res.status(201).send(req.session.cart);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
