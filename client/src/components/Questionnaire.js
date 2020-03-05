import React, { Fragment, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import questionnaire, { initialState } from '../reducers/questionnaire';
import { GET_ANSWERS } from '../actions/types';
import { useStylesQuestionnaire as useStyles } from '../styles';

function Questionnaire() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [state, dispatch] = useReducer(questionnaire, initialState);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [votesSum, setVotesSum] = useState(0);
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const classes = useStyles();

  const fetchAnswers = async () => {
    try {
      const res = await axios.get('/questionnaire', {
        cancelToken: source.token,
      });
      const { votesSum, show, answers } = res.data;
      setVotesSum(votesSum);
      setShowQuestionnaire(show);
      dispatch({
        type: GET_ANSWERS,
        payload: answers,
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchAnswers();
    return () => {
      source.cancel('Fetching questionnaire canceled.');
    };
  }, [showQuestionnaire]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ value });
    try {
      await axios.post('/questionnaire', body, config);
      setShowQuestionnaire(false);
    } catch (err) {
      console.log(err.response);
      setErrorMsg('You have already voted! Try again tomorrow...');
    }
  };

  const { answers } = state;

  return (
    <div>
      <h1>Questionnaire</h1>
      {showQuestionnaire ? (
        <form onSubmit={e => handleOnSubmit(e)}>
          <h3>Are you satisfied with the search results?</h3>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              aria-label="questionnaire"
              name="questionnaire"
              value={value}
              onChange={handleChange}
            >
              {answers?.map(item => {
                const { title, _id } = item;
                return (
                  <FormControlLabel
                    key={_id}
                    value={_id}
                    control={<Radio />}
                    label={title}
                  />
                );
              })}
            </RadioGroup>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!!errorMsg}
            >
              Send answer
            </Button>
            {errorMsg && (
              <Fragment>
                <h4>{errorMsg}</h4>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowQuestionnaire(false)}
                >
                  Results
                </Button>
              </Fragment>
            )}
          </FormControl>
        </form>
      ) : (
        <Fragment>
          <h3>You have already voted</h3>
          <h3>Results</h3>
          {answers?.map(item => {
            const { title, votes, _id } = item;
            return (
              <p key={_id}>
                {title} ({Math.round((votes * votesSum) / 100)}%)
              </p>
            );
          })}
        </Fragment>
      )}
    </div>
  );
}

export default Questionnaire;
