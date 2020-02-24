import {
  LOGIN_ADMIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from '../actions/types';

export const initialState = {
  userIsAuthenticated: false,
  adminIsAuthenticated: false,
  tokenAdmin: null,
  tokenUser: null,
};

export default function(state, action) {
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
