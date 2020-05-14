import { combineReducers } from 'redux';
import basket from './basket';
import products from './products';
import auth from './auth';
import questionnaire from './questionnaire';

export default combineReducers({
  basket,
  products,
  auth,
  questionnaire,
});
