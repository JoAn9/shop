const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authToken = require('../middleware/authToken');

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
    res.status(500).send('Something went wrong');
  }
});

router.get('/', async (req, res) => {
  try {
    const sessionProducts = req.session.cart.products;
    const productIds = sessionProducts.map(item => item.id);
    const products = await Product.find()
      .where('_id')
      .in(productIds);
    let productsToSend = [];
    for (item of sessionProducts) {
      let product = products.find(p => p._id == item.id);
      product = {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        productImg: product.productImg,
      };
      productsToSend.push(product);
    }
    res.status(200).json(productsToSend);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
