import { LOGIN_SUCCESS } from './types';

// @todo: dispatch action loadUser when ready to set isAuthenticated to true when refresh page (in App comp)
export const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, token } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', token);
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
