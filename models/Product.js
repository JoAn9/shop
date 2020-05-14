const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  created: { type: Date, default: Date.now },
  productImg: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
