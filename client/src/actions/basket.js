import { ADD_PRODUCT_TO_BASKET, ADD_QUANTITY, REMOVE_QUANTITY } from './types';

export const addProductToBasket = ({
  _id,
  title,
  price,
  quantity,
}) => dispatch => {
  console.log(_id, title, price, quantity);
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    payload: { _id, title, price, quantity },
  });
};

export const addQuantity = item => dispatch => {
  dispatch({
    type: ADD_QUANTITY,
    payload: { ...item, quantity: item.quantity + 1 },
  });
};

export const removeQuantity = item => dispatch => {
  dispatch({
    type: REMOVE_QUANTITY,
    payload: { ...item, quantity: item.quantity - 1 },
  });
};
