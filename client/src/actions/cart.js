import axios from 'axios';
import {
  ADD_PRODUCT_TO_CART,
  GET_PRODUCTS_IN_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './types';

export const addProductToCart = ({
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
  } catch (err) {
    console.log(err);
  }

  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: { _id, title, price, quantity, productImg },
  });
};

export const addQuantity = item => async dispatch => {
  dispatch(
    addProductToCart({
      _id: item._id,
      title: item.title,
      price: item.price,
      quantity: 1,
      productImg: item.productImg,
    })
  );
};

export const removeQuantity = item => async dispatch => {
  dispatch(
    addProductToCart({
      _id: item._id,
      title: item.title,
      price: item.price,
      quantity: -1,
      productImg: item.productImg,
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
    console.log(err);
  }
};

export const deleteFromCart = item => async dispatch => {
  try {
    await axios.delete(`/cart/${item._id}`);
    dispatch({
      type: REMOVE_PRODUCT_FROM_CART,
      payload: item._id,
    });
  } catch (err) {
    console.log(err);
  }
};
