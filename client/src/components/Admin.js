import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStylesLogin as useStyles } from '../styles';
import { loginAdmin } from '../actions/auth';

function Admin({ loginAdmin, history }) {
  const classes = useStyles();

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
    loginAdmin(login, password, history);
  };

  return (
    <form className={classes.root} onSubmit={onSubmit}>
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

export default connect(null, { loginAdmin })(Admin);
