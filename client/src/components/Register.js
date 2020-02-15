import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { LOGIN_SUCCESS } from '../store/types';
import { AuthContext } from '../App';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
    },
    '& button': {
      backgroundColor: 'var(--primary-color)',
      marginTop: theme.spacing(5),
    },
  },
}));

function Register() {
  const { dispatch, state } = useContext(AuthContext);
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChangeEmail = event => {
    setErrorEmail(false);
    setEmail(event.target.value);
  };

  const handleChangePassword = event => {
    setErrorPassword(false);
    setPassword(event.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    // if (!email) {
    //   return setErrorEmail(true);
    // } else if (!password) {
    //   return setErrorPassword(true);
    // }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/users', body, config);
      console.log(res);
      // dispatch({ type: LOGIN_SUCCESS, token });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(state);

  return (
    <form className={classes.root} onSubmit={e => onSubmit(e)}>
      <TextField
        id="email"
        label="Email"
        value={email}
        onChange={handleChangeEmail}
        variant="outlined"
        error={errorEmail}
        helperText={errorEmail && 'This field is required'}
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={handleChangePassword}
        variant="outlined"
        error={errorPassword}
        helperText={errorPassword && 'This field is required'}
      />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
}

export default Register;
