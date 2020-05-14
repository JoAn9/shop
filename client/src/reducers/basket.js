import {
  ADD_PRODUCT_TO_BASKET,
  GET_PRODUCTS_IN_BASKET,
} from '../actions/types';

const initialState = {
  products: [],
};

export default function(state = initialState, action) {
  const addProduct = () => {
    const addedProduct = action.payload;
    let existingTheSameProduct = state.products.find(
      item => item._id === addedProduct._id
    );
    if (existingTheSameProduct) {
      existingTheSameProduct.quantity += Number(addedProduct.quantity);
      return [...state.products];
    } else {
      return [...state.products, addedProduct];
    }
  };

  switch (action.type) {
    case GET_PRODUCTS_IN_BASKET:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
        products: addProduct(),
      };
    default:
      return state;
  }
}
