import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

function ProtectedRoute({ component: Component, ...rest }) {
  const {
    state: { adminIsAuthenticated },
  } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        adminIsAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/admin' }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
