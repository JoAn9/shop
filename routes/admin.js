const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/public/images');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // cb(null, false);
    cb(new Error('Wrong file format!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
  fileFilter: fileFilter,
});

// @route    POST admin/products
// @desc     Add a product
// @access   Private
router.post('/products', upload.single('productImg'), async (req, res) => {
  const { title, description, price } = req.body;

  if (req.file) {
    const newProduct = new Product({
      title,
      description,
      price,
      productImg: req.file.path,
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
      res.status(500).send('Server error', err.message);
    }
  } else {
    return res.status(400).json({
      errors: {
        price: { message: "Path 'image' is required" },
      },
    });
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
