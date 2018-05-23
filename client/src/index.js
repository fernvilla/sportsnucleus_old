import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App, NoMatch } from './site/components';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <BrowserRouter forceRefresh={window.innerWidth < 768}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
