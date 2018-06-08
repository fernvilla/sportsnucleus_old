import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Admin, NoMatch, Home, SiteNav, Login, Signup } from './components';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

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
    leagues: [],
    leaguesFetched: false
  };

  componentDidMount() {
    this.fetchleagues();
  }

  fetchleagues() {
    axios
      .get(`/api/leagues`)
      .then(({ data: { payload } }) => {
        this.setState({ leagues: payload, leaguesFetched: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { leaguesFetched, leagues } = this.state;

    if (!leaguesFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <BrowserRouter>
        <div>
          <SiteNav leagues={leagues} />

          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/signup'} component={Signup} />
            <PrivateRoute authorized={false} path="/admin" component={Admin} />
            <Route path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
