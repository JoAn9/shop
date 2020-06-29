import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStylesLogin as useStyles } from '../styles';
import { loginUser } from '../actions/auth';

function Login({ loginUser, history, userIsAuthenticated }) {
  const classes = useStyles();

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
    loginUser(email, password, history);
  };

  if (userIsAuthenticated) {
    history.push('/userPanel');
    return null;
  }

  return (
    <form className={classes.root} onSubmit={onSubmit}>
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

const mapStateToProps = state => ({
  userIsAuthenticated: state.auth.userIsAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
