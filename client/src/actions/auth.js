import axios from 'axios';
import { LOGIN_ADMIN_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT } from './types';

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
    history.push('/admin/products');
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    history.push('/products');
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => dispatch =>
  dispatch({
    type: LOGOUT,
  });
