import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import setToken from '../utils/setToken';

function UserPanel() {
  useEffect(() => {
    fetchUser();
    return () => {
      // cleanup
    };
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('tokenUser');
    setToken(token);
    const res = await axios.get('/auth/user');
    console.log(res);
  };
  return (
    <Fragment>
      <div>User Panel</div>
    </Fragment>
  );
}
export default UserPanel;
