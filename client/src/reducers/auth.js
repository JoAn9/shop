import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  ADMIN_LOADED,
} from '../actions/types';

export const initialState = {
  userIsAuthenticated: false,
  adminIsAuthenticated: false,
  tokenAdmin: null,
  tokenUser: null,
  user: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem('tokenAdmin', payload);
      localStorage.removeItem('tokenUser');
      return {
        ...state,
        adminIsAuthenticated: true,
        userIsAuthenticated: false,
        tokenAdmin: payload,
        tokenUser: null,
        user: null,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('tokenUser', payload);
      localStorage.removeItem('tokenAdmin');
      return {
        ...state,
        userIsAuthenticated: true,
        adminIsAuthenticated: false,
        tokenUser: payload,
        tokenAdmin: null,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        adminIsAuthenticated: true,
        userIsAuthenticated: false,
        tokenUser: null,
        tokenAdmin: localStorage.getItem('tokenAdmin'),
        user: null,
      };
    case USER_LOADED:
      return {
        ...state,
        userIsAuthenticated: true,
        adminIsAuthenticated: false,
        tokenUser: localStorage.getItem('tokenUser'),
        tokenAdmin: null,
        user: payload,
      };
    case AUTH_ERROR:
      return {};
    case LOGOUT: {
      // localStorage.clear();
      localStorage.removeItem('tokenAdmin');
      localStorage.removeItem('tokenUser');
      return {
        ...state,
        adminIsAuthenticated: false,
        userIsAuthenticated: false,
        tokenUser: null,
        tokenAdmin: null,
        user: null,
      };
    }
    default:
      return state;
  }
}
