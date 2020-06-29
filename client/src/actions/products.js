import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT,
  ADD_PRODUCT,
} from './types';

export const fetchProducts = cancelToken => async dispatch => {
  try {
    const res = await axios.get('/products', {
      cancelToken,
    });
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled:', err.message);
    } else {
      dispatch(
        setAlert(err.response?.data.message || 'Something went wrong', 'error')
      );
    }
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
    } else {
      dispatch(setAlert('Something went wrong', 'error'));
    }
  }
};

export const addProductToDb = (
  { title, description, price },
  selectedFile
) => async dispatch => {
  const body = new FormData();
  body.append('productImg', selectedFile);
  body.append('title', title);
  body.append('description', description);
  body.append('price', price);

  const contentType = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  // if no selectedFile - selectedFile is an empty array,
  // if one selectedFile - selectedFile is an object
  if (title && description && price && selectedFile.length !== 0) {
    try {
      const res = await axios.post('/admin/products', body, contentType);
      dispatch({ type: ADD_PRODUCT, payload: res.data });
      setAlert('Product successfully added', 'success');
    } catch (err) {
      dispatch(setAlert('Something went wrong', 'error'));
    }
  } else {
    dispatch(setAlert('All fields are required', 'error'));
  }
};
