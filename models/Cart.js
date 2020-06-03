module.exports = function Cart(oldCart) {
  this.products = oldCart ? oldCart.products : [];
  this.createdAt =
    this.products.length === 0
      ? new Date()
      : (this.createdAt = oldCart.createdAt);
  this.updatedAt = new Date();

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
};
