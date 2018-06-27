import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from 'store';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { fetchTeams } from './actions/teamsActions';
import { fetchLeagues } from './actions/leaguesActions';
import reduxStore from './store';
import { Admin, Home, SiteNav, Login, Register, AdminRoute, Team, League } from './components';

const jwtToken = store.get('jwtToken');

if (jwtToken) {
  setAuthToken(jwtToken);

  const decoded = jwt_decode(jwtToken);

  reduxStore.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    reduxStore.dispatch(logoutUser());
    window.location.href = '/';
  }
}

// Grab "initial state" for app
reduxStore.dispatch(fetchLeagues());
reduxStore.dispatch(fetchTeams());
reduxStore.subscribe(
  throttle(() => {
    saveState({
      favorites: reduxStore.getState().favorites,
      bookmarks: reduxStore.getState().bookmarks
    });
  }, 1000)
);

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
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
