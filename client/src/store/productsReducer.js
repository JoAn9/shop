import { DELETE_PRODUCT, ADD_PRODUCT, GET_PRODUCTS } from './types';

export const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: payload,
        ...state.products,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(item => item._id !== payload),
      };
    default:
      return state;
  }
};
