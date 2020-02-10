import React, { useState, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_SUCCESS } from '../store/types';
import { authReducer, initialState } from '../store/authReducer';

function Login() {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const { login, password } = loginData;

  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLoginData = e =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
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
    } catch (err) {
      console.log(err);
    }
  };

  if (state.isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  console.log(state);

  return (
    <form onSubmit={e => onSubmit(e)}>
      <p>
        <input
          type="text"
          placeholder="login or email"
          name="login"
          value={login}
          onChange={e => handleLoginData(e)}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={e => handleLoginData(e)}
        />
      </p>
      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
  );
}

export default Login;
