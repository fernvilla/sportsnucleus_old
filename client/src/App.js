import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Admin, Home, SiteNav, Login, Signup } from './components';
import axios from 'axios';

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
      <Router>
        <div>
          <SiteNav leagues={leagues} />

          <Route exact path={'/login'} component={Login} />
          <Route exact path={'/signup'} component={Signup} />
          <PrivateRoute authorized={false} exact path="/admin" component={Admin} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}
