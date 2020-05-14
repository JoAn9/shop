import { ADD_PRODUCT_TO_BASKET } from './types';

export const addProductToBasket = ({
  _id,
  title,
  price,
  quantity,
}) => dispatch => {
  console.log(_id, title, price, quantity);
  dispatch({
    type: ADD_PRODUCT_TO_BASKET,
    payload: { _id, title, price, quantity },
  });
};
