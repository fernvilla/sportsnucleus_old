import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, Home } from '.';

import './../../stylesheets/app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical className="hero" textAlign="center">
          <Nav />
          <Home />
        </Segment>

        <Segment basic className="feed-container">
          <Container>Content here</Container>
        </Segment>
      </div>
    );
  }
}

export default App;
