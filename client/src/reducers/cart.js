import { ADD_PRODUCT_TO_CART, GET_PRODUCTS_IN_CART } from '../actions/types';

const initialState = {
  products: [],
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  const addProduct = () => {
    let productInCart = state.products.find(item => item._id === payload._id);
    if (productInCart) {
      productInCart.quantity += payload.quantity;
      return [...state.products];
    } else {
      return [...state.products, payload];
    }
  };

  switch (type) {
    case GET_PRODUCTS_IN_CART:
      return {
        ...state,
        products: payload,
      };
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: addProduct(),
      };
    default:
      return state;
  }
}
