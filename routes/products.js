const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route    GET /products
// @desc     Get all products
// @access   Public
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  try {
    const products = await Product.find({
      title: new RegExp(search.trim(), 'i'),
    }).sort({ created: -1 });
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
// query = {$or:[{firstName:{$regex: req.body.customerName, $options: 'i'}},{lastName:{$regex: req.body.customerName, $options: 'i'}}]}
