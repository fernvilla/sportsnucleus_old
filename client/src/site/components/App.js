import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { Nav, Home } from '.';

import './../../stylesheets/app.css';

class App extends Component {
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
      .then(({ data }) => {
        this.setState({ leagues: data, leaguesFetched: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { leaguesFetched, leagues } = this.state;

    if (!leaguesFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    const {
      match: { path }
    } = this.props;

    return (
      <Fragment>
        <Nav leagues={leagues} />
        <Route exact path={path} component={Home} />
      </Fragment>
    );
  }
}

export default App;
