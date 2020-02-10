const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// @route    POST admin/products
// @desc     Add a product
// TODO! // @access   Private
router.post('/products', async (req, res) => {
  const { title, description } = req.body;
  const newProduct = new Product({
    title,
    description,
  });
  const errors = newProduct.validateSync();

  if (errors) {
    return res.status(400).json({ errors: errors.errors });
  }

  try {
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE admin/products/:id
// @desc     Delete a product
// TODO! @access   Private
router.delete('/products/:id', async (req, res) => {
  Product.findByIdAndDelete(req.params.id, err => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
    res.json({ msg: 'Product deleted' });
  });
});

module.exports = router;
