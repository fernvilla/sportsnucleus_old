import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App as SiteApp, NoMatch } from './site/components';
import { App as AdminApp } from './admin/components';

import 'semantic-ui-css/semantic.min.css';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminApp} />
      <Route path="/" component={SiteApp} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
