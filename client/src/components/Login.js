import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { LOGIN_SUCCESS } from '../store/types';
import { AuthContext } from '../App';
import { useStylesLogin } from '../utils';

function Login() {
  const { dispatch, state } = useContext(AuthContext);
  const classes = useStylesLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChangeEmail = event => {
    setErrorLogin(false);
    setEmail(event.target.value);
  };

  const handleChangePassword = event => {
    setErrorPassword(false);
    setPassword(event.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!email) {
      return setErrorLogin(true);
    } else if (!password) {
      return setErrorPassword(true);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('/auth/user', body, config);
      console.log(res);
      const {
        data: { token },
      } = res;
      dispatch({ type: LOGIN_SUCCESS, payload: token });
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
        id="email"
        label="Email"
        value={email}
        onChange={handleChangeEmail}
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
