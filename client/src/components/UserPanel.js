import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import setToken from '../utils/setToken';

function UserPanel() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    fetchUser();
    return () => {
      source.cancel('Fetching user panel canceled.');
    };
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('tokenUser');
      setToken(token);
      const res = await axios.get('/auth/user', {
        cancelToken: source.token,
      });
      console.log(res);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      }
    }
  };
  return (
    <Fragment>
      <div>User Panel</div>
    </Fragment>
  );
}
export default UserPanel;
