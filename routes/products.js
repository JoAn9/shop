const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route    GET /products
// @desc     Get all products or by query
// @access   Public
router.get('/', async (req, res) => {
  const search = req.query.search || '';

  const searchArray = search.trim().split(' ');
  let arrayQuery = [];
  for (let i = 0; i < searchArray.length; i++) {
    arrayQuery.push({ title: { $regex: searchArray[i], $options: 'i' } });
  }
  const query = {
    $or: arrayQuery,
  };

  try {
    const products = await Product.find(query).sort({ created: -1 });
    // title: new RegExp(search.trim(), 'i'),
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route    GET /products/:id
// @desc     Get product by id
// @access   Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
