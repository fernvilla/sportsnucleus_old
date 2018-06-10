import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import { Admin, Home, SiteNav, Login, Register, AdminRoute } from './components';

const { jwtToken } = localStorage;

if (jwtToken) {
  setAuthToken(jwtToken);

  const decoded = jwt_decode(jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser);
    //TODO: clear current profile
    window.location.href = '/login';
  }
}

class App extends Component {
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
            <Switch>
              <AdminRoute exact path="/admin" component={Admin} />
            </Switch>
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
