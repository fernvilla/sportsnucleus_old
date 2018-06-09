import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Admin, Home, SiteNav, Login, Register } from './components';

const PrivateRoute = ({ component: Component, authorized, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authorized === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default class componentName extends Component {
  state = {
    leagues: []
  };

  componentDidMount() {
    this.fetchleagues();
  }

  fetchleagues() {
    axios
      .get(`/api/leagues`)
      .then(({ data }) => {
        this.setState({ leagues: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { leagues } = this.state;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <SiteNav leagues={leagues} />

            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/signup'} component={Register} />
            <PrivateRoute authorized={false} exact path="/admin" component={Admin} />
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </Provider>
    );
  }
}
