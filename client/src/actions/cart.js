import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCTS_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './types';

const sendToCart = ({
  _id,
  title,
  price,
  quantity,
  productImg,
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ _id, quantity });

  try {
    await axios.post('/cart', body, config);
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: { _id, title, price, quantity, productImg },
    });
  } catch (err) {
    dispatch(setAlert('Some error has occurred', 'error'));
  }
};

export const addProductToCart = product => async dispatch => {
  dispatch(sendToCart(product));
  dispatch(setAlert('Product added to cart', 'info'));
};

export const addQuantity = ({
  _id,
  title,
  price,
  productImg,
}) => async dispatch => {
  dispatch(
    sendToCart({
      _id,
      title,
      price,
      quantity: 1,
      productImg,
    })
  );
};

export const removeQuantity = ({
  _id,
  title,
  price,
  productImg,
}) => async dispatch => {
  dispatch(
    sendToCart({
      _id,
      title,
      price,
      quantity: -1,
      productImg,
    })
  );
};

export const getProductsToCart = () => async dispatch => {
  try {
    const res = await axios.get('/cart');
    dispatch({
      type: GET_PRODUCTS_IN_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('Some error has occurred', 'error'));
  }
};

export const deleteFromCart = item => async dispatch => {
  try {
    await axios.delete(`/cart/${item._id}`);
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART,
      payload: item._id,
    });
    dispatch(setAlert('Product removed from cart', 'info'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
