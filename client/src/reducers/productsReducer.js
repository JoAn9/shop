import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
} from '../actions/types';

export const initialState = {
  products: [],
  product: {},
};

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
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
}
