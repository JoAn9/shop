const Product = require('../models/Product');

module.exports = function Cart(oldCart) {
  this.products = oldCart ? oldCart.products : [];
  this.createdAt = this.products.length === 0 ? new Date() : oldCart.createdAt;
  this.updatedAt = new Date();
  this.productsArray = [];

  this.add = function(id, quantity) {
    if (this.products.length === 0) {
      //no cart
      this.products = [{ id, quantity }];
    } else {
      //cart exists
      let itemInCart = this.products.find(item => item.id == id);
      if (itemInCart) {
        // only update quantity
        itemInCart.quantity += quantity;
      } else {
        // add new product to cart
        this.products.push({ id, quantity });
      }
    }
  };

  this.getAllProduct = async function() {
    const productIds = this.products.map(item => item.id);

    // products from DB
    const products = await Product.find()
      .where('_id')
      .in(productIds);

    // products from session
    for (item of this.products) {
      let product = products.find(p => p._id == item.id);
      if (product) {
        product = {
          _id: product._id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
          productImg: product.productImg,
        };
        this.productsArray.push(product);
      }
    }
  };

  this.removeFromCart = function(id) {
    const itemInCart = this.products.find(item => item.id === id);
    if (itemInCart) {
      const productsWithRemovedItem = this.products.filter(
        item => item.id !== id
      );
      this.products = productsWithRemovedItem;
    } else {
      return;
    }
  };
};
