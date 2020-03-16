const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
// const Image = require('../models/Image');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // To accept the file pass `true`
    cb(null, true);
  } else {
    // To reject this file pass `false`
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
  fileFilter: fileFilter,
});

// @route     POST admin/products/img
// @desc      save img

// router.post('/products/img', upload.single('file'), (req, res, next) => {

//   const imgPath = `${UPLOAD_PATH}/${req.file.filename}`;
//   const image = new Image();
//   image.img.data = fs.readFileSync(imgPath);
//   image.img.contentType = 'image';
//   image.save(function(err, result) {
//     if (err) return console.log(err.message);
//     res.send(result);
//   });
// });

// @route    POST admin/products
// @desc     Add a product
// @access   Private
router.post('/products', upload.single('productImg'), async (req, res) => {
  console.log('file', req.file);
  const { title, description } = req.body;
  const { path } = req.file;

  const newProduct = new Product({
    title,
    description,
    // img: image,
    productImg: path,
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
    // res.status(500).json({ error: err });
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
