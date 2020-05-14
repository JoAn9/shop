import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStylesLogin as useStyles } from '../styles';
import { registerUser } from '../actions/auth';

function Register({ registerUser, history }) {
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
    if (!email) {
      return setErrorEmail(true);
    } else if (!password) {
      return setErrorPassword(true);
    }
    registerUser(email, password, history);
  };

  return (
    <form className={classes.root} onSubmit={onSubmit}>
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

export default connect(null, { registerUser })(Register);
