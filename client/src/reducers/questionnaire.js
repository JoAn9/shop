import { GET_QUESTIONNAIRE } from '../actions/types';

export const initialState = {
  questionnaire: {
    answers: [],
    votesSum: null,
    show: false,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTIONNAIRE:
      return {
        ...state,
        questionnaire: payload,
      };
    default:
      return state;
  }
}
