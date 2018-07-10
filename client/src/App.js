import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from 'store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { getCurrentProfile } from './actions/profileActions';
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
    reduxStore.dispatch(clearCurrentProfile());
    window.location.href = '/';
  }
}

class App extends Component {
  componentDidMount() {
    const { fetchLeagues, fetchTeams, getCurrentProfile } = this.props;

    fetchLeagues();
    fetchTeams();

    const isAuthenticated = reduxStore.getState().auth.isAuthenticated;

    if (isAuthenticated) getCurrentProfile();
  }

  render() {
    return (
      <Router>
        <Fragment>
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
        </Fragment>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLeagues: () => dispatch(fetchLeagues()),
  fetchTeams: () => dispatch(fetchTeams()),
  getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
