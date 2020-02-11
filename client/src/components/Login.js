import React, { useState, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { LOGIN_SUCCESS } from '../store/types';
import { authReducer, initialState } from '../store/authReducer';

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
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChangeLogin = event => {
    setErrorLogin(false);
    setLogin(event.target.value);
  };

  const handleChangePassword = event => {
    setErrorPassword(false);
    setPassword(event.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!login) {
      return setErrorLogin(true);
    } else if (!password) {
      return setErrorPassword(true);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ login, password });

    try {
      const res = await axios.post('/login', body, config);
      const {
        data: { token },
      } = res;
      dispatch({ type: LOGIN_SUCCESS, token });
      console.log('success');
    } catch (err) {
      console.log(err);
    }
  };

  if (state.isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  console.log(state);

  return (
    <form className={classes.root} onSubmit={e => onSubmit(e)}>
      <TextField
        id="login"
        label="Login"
        value={login}
        onChange={handleChangeLogin}
        variant="outlined"
        error={errorLogin}
        helperText={errorLogin && 'This field is required'}
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
        Login
      </Button>
    </form>
  );
}

export default Login;
