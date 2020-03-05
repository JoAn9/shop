import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

function ProtectedRouteUser({ component: Component, ...rest }) {
  const {
    state: { userIsAuthenticated },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        userIsAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/user' }} />
        )
      }
    />
  );
}

export default ProtectedRouteUser;
