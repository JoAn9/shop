const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authToken = require('../middleware/authToken');

// @route    POST /cart
// @desc     Add product to cart
router.post('/', authToken, async (req, res) => {
  const { _id, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // cart exists for user
      let itemInCart = cart.products.find(item => item._id == _id);
      if (itemInCart) {
        // product exists, update quantity
        itemInCart.quantity += quantity;
      } else {
        // add new product
        cart.products.push({ _id, quantity });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new one
      let newCart = await new Cart({
        userId,
        products: [{ _id, quantity }],
      }).save();
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
