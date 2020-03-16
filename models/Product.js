const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created: { type: Date, default: Date.now },
  // img: { data: Buffer, contentType: String },
  productImg: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
