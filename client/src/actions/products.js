import axios from 'axios';
import { setAlert } from './alert';
import { GET_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT } from './types';

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
    dispatch(
      setAlert(err.response.data.message || 'Something went wrong', 'error')
    );
  }
};

export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/admin/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    dispatch(setAlert('Product removed', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

// @todo handle errors
export const searchProducts = search => async dispatch => {
  try {
    const res = await axios.get('/products', { params: { search } });
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    dispatch(setAlert('Something went wrong', 'error'));
  }
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
    dispatch(setAlert('Something went wrong', 'error'));
  }
};
