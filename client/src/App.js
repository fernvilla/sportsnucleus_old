import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { fetchTeams } from './actions/teamsActions';
import { fetchLeagues } from './actions/leaguesActions';
import store from './store';
import { Admin, Home, SiteNav, Login, Register, AdminRoute, Team, League } from './components';

const { jwtToken } = localStorage;

if (jwtToken) {
  setAuthToken(jwtToken);

  const decoded = jwt_decode(jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: clear current profile
    window.location.href = '/';
  }
}

// Grab "initial state" for app
store.dispatch(fetchLeagues());
store.dispatch(fetchTeams());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <SiteNav />

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Switch>
              <AdminRoute path="/admin" component={Admin} />
            </Switch>
            <Switch>
              <Route exact path="/teams/:team" component={Team} />
            </Switch>
            <Switch>
              <Route exact path="/leagues/:league" component={League} />
            </Switch>
            <Route exact path="/" component={Home} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
