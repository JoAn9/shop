import { combineReducers } from 'redux';
import cart from './cart';
import products from './products';
import auth from './auth';
import questionnaire from './questionnaire';
import alert from './alert';

export default combineReducers({
  cart,
  products,
  auth,
  questionnaire,
  alert,
});
