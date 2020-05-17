import { GET_QUESTIONNAIRE, QUESTIONNAIRE_ERROR } from '../actions/types';

export const initialState = {
  questionnaire: {
    answers: [],
    votesSum: null,
    show: false,
  },
  error: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTIONNAIRE:
      return {
        ...state,
        questionnaire: payload,
      };
    case QUESTIONNAIRE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
