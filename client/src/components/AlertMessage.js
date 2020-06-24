import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CustomizedSnackbars from './CustomizedSnackbar';

function AlertMessage({ alert }) {
  if (!alert.id) return null;
  return (
    <Fragment>
      <CustomizedSnackbars key={alert.id} alert={alert} />
    </Fragment>
  );
}

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(AlertMessage);
