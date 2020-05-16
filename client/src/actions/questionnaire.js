import axios from 'axios';
import { GET_QUESTIONNAIRE } from './types';

export const fetchQuestionnaire = cancelToken => async dispatch => {
  try {
    const res = await axios.get('/questionnaire', {
      cancelToken,
    });
    const { votesSum, show, answers } = res.data;

    dispatch({
      type: GET_QUESTIONNAIRE,
      payload: { answers, votesSum, show },
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('Request canceled:', err.message);
    }
  }
};

export const voteQuestionnaire = value => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ value });
  try {
    await axios.post('/questionnaire', body, config);
    dispatch(fetchQuestionnaire());
  } catch (err) {
    console.log(err.response);
  }
};
