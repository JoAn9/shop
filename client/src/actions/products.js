import axios from 'axios';
import { GET_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT } from './types';

// @todo handle errors
export const fetchProducts = cancelToken => async dispatch => {
  try {
    const res = await axios.get('/products', {
      cancelToken,
    });
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled:', err.message);
    }
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/admin/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (err) {}
};

// @todo handle errors
export const searchProducts = search => async dispatch => {
  try {
    const res = await axios.get('/products', { params: { search } });
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {}
};

export const fetchProductById = (id, cancelToken) => async dispatch => {
  try {
    const res = await axios.get(`/products/${id}`, {
      cancelToken,
    });
    dispatch({ type: GET_PRODUCT, payload: res.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled:', err.message);
    }
  }
};
