import axios from 'axios';
import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from './types';
import { setAlert } from './alert';
import setToken from '../utils/setToken';

export const loginAdmin = (login, password, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ login, password });

  try {
    const res = await axios.post('/auth/admin', body, config);
    const {
      data: { token },
    } = res;
    dispatch({
      type: LOGIN_ADMIN_SUCCESS,
      payload: token,
    });
    dispatch(setAlert('Login as admin succeed', 'success'));
    history.push('/admin/products');
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const loginUser = (email, password, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth/user', body, config);
    const {
      data: { token },
    } = res;
    dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
    history.push('/userPanel');
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const registerUser = (email, password, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/users', body, config);
    const {
      data: { token },
    } = res;
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: token,
    });
    dispatch(setAlert('User successfully registered', 'info'));
    history.push('/products');
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const loadUser = cancelToken => async dispatch => {
  const token = localStorage.getItem('tokenUser');
  setToken(token);
  try {
    const res = await axios.get('/auth/user', {
      cancelToken,
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled:', err.message);
    }
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert('Logged out successfully', 'info'));
};
