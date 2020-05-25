import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCTS_IN_CART,
  ADD_QUANTITY,
  REMOVE_QUANTITY,
} from '../actions/types';

const initialState = {
  products: [],
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  const addProduct = () => {
    let theSameProduct = state.products.find(item => item._id === payload._id);
    if (theSameProduct) {
      theSameProduct.quantity += Number(payload.quantity);
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
    case ADD_QUANTITY:
    case REMOVE_QUANTITY:
      return {
        ...state,
        products: state.products.map(item =>
          item._id === payload._id
            ? { ...item, quantity: payload.quantity || 1 }
            : item
        ),
      };
    default:
      return state;
  }
}
