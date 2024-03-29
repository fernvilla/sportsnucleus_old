import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { AdminNav, Dashboard, Leagues, Teams, TwitterAccounts, Users } from './../../components';

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
      <Route exact path={`${path}/teams`} component={Teams} />
      <Route exact path={`${path}/twitter-accounts`} component={TwitterAccounts} />
      <Route exact path={`${path}/users`} component={Users} />
    </Fragment>
  );
};

export default Admin;
