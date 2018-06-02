import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, Leagues, Nav } from '.';

import './../stylesheets/admin.css';

const App = props => {
  const {
    match: { path }
  } = props;

  return (
    <Fragment>
      <Nav />
      <Route exact path={path} component={Dashboard} />
      <Route exact path={`${path}/leagues`} component={Leagues} />
    </Fragment>
  );
};

export default App;
