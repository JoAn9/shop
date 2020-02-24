import { GET_ANSWERS } from '../actions/types';

export const initialState = {
  answers: [],
};

export default function(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: payload,
      };
    default:
      return state;
  }
}
