import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';

function UserPanel({ loadUser }) {
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    loadUser(cancelToken.token);
    return () => {
      cancelToken.cancel('Fetching user panel canceled.');
    };
  }, [loadUser, cancelToken]);

  return (
    <Fragment>
      <div>User Panel</div>
    </Fragment>
  );
}
export default connect(null, { loadUser })(UserPanel);
