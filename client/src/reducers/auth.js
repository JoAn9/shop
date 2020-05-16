import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
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
      return {
        ...state,
        adminIsAuthenticated: true,
        tokenAdmin: payload,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('tokenUser', payload);
      return {
        ...state,
        userIsAuthenticated: true,
        tokenUser: payload,
      };
    case USER_LOADED:
      return {
        ...state,
        userIsAuthenticated: true,
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
      };
    }
    default:
      return state;
  }
}
