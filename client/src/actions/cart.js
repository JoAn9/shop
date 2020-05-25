import axios from 'axios';
import { ADD_PRODUCT_TO_CART, ADD_QUANTITY, REMOVE_QUANTITY } from './types';

export const addProductToCart = ({
  _id,
  title,
  price,
  quantity,
}) => async dispatch => {
  console.log(_id, title, price, quantity);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ _id, quantity: Number(quantity) });

  try {
    const res = await axios.post('/cart', body, config);
    console.log(res);
  } catch (err) {
    console.log(err);
  }

  dispatch({
    type: ADD_PRODUCT_TO_CART,
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
