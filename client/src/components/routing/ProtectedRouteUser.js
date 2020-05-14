import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRouteUser({
  component: Component,
  userIsAuthenticated,
  ...rest
}) {
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

const mapStateToProps = state => ({
  userIsAuthenticated: state.auth.userIsAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRouteUser);
