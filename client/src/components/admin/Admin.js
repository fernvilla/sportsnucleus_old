import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { AdminNav, Dashboard, Leagues } from './../../components';

import './../../stylesheets/admin.css';

const Admin = props => {
  const {
    match: { path }
  } = props;

  return (
    <Fragment>
      <AdminNav />
      <Route exact path={path} component={Dashboard} />
      <Route exact path={`${path}/leagues`} component={Leagues} />
    </Fragment>
  );
};

export default Admin;
