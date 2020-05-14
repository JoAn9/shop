import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRouteAdmin({
  component: Component,
  adminIsAuthenticated,
  ...rest
}) {
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

const mapStateToProps = state => ({
  adminIsAuthenticated: state.auth.adminIsAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRouteAdmin);
