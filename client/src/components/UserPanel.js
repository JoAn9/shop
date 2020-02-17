import React, { useEffect, Fragment } from 'react';
import axios from 'axios';

function UserPanel() {
  useEffect(() => {
    fetchUser();
    return () => {
      // cleanup
    };
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('tokenUser');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
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
