import React, { Fragment, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  fetchQuestionnaire,
  voteQuestionnaire,
} from '../actions/questionnaire';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    '& button': {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
  },
}));

function Questionnaire({
  fetchQuestionnaire,
  voteQuestionnaire,
  questionnaire: { answers, votesSum, show },
}) {
  const classes = useStyles();

  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [votesSumQuestionnaire, setVotesSumQuestionnaire] = useState(0);
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const cancelToken = axios.CancelToken.source();

  // @todo ???
  useEffect(() => {
    fetchQuestionnaire(cancelToken.token);
    setVotesSumQuestionnaire(votesSum);
    setShowQuestionnaire(show);
    return () => {
      cancelToken.cancel('Fetching questionnaire canceled.');
    };
  }, [votesSum, show]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    voteQuestionnaire(value);
    setShowQuestionnaire(false);
    // setErrorMsg('You have already voted!');
  };

  return (
    <div>
      <h1>Questionnaire</h1>
      {showQuestionnaire ? (
        <form onSubmit={handleOnSubmit}>
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
                {title} ({Math.round((votes * votesSumQuestionnaire) / 100)}%)
              </p>
            );
          })}
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  questionnaire: state.questionnaire.questionnaire,
});

export default connect(mapStateToProps, {
  fetchQuestionnaire,
  voteQuestionnaire,
})(Questionnaire);
