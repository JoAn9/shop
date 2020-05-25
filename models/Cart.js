const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: mongoose.ObjectId,
        quantity: Number,
        title: String,
        price: Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
