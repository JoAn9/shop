import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import questionnaire, { initialState } from '../reducers/questionnaire';
import { GET_ANSWERS } from '../actions/types';
import { useStylesQuestionnaire as useStyles } from '../styles';

function Questionnaire() {
  const [state, dispatch] = useReducer(questionnaire, initialState);

  const fetchAnswers = async () => {
    const res = await axios.get('/questionnaire');
    dispatch({
      type: GET_ANSWERS,
      payload: res.data,
    });
  };

  useEffect(() => {
    fetchAnswers();
    return () => {
      // cleanup
    };
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState('');

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
      const res = await axios.post('/questionnaire', body, config);
      console.log(res);
    } catch (err) {
      console.log(err.response);
    }
  };

  const { answers } = state;

  return (
    <div>
      <h1>Questionnaire</h1>
      <form onSubmit={e => handleOnSubmit(e)}>
        <h2>Are you satisfied with the search results?</h2>
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">are you satisfied with the search results</FormLabel> */}
          <RadioGroup
            aria-label="questionnaire"
            name="questionnaire"
            value={value}
            onChange={handleChange}
          >
            {answers.map(item => {
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
          <Button type="submit" variant="contained" color="primary">
            Send answer
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default Questionnaire;
