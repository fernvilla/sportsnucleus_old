import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { Nav, Home, Feed } from '.';

import './../../stylesheets/app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Segment inverted vertical className="hero" textAlign="center">
          <Nav />
          <Home />
        </Segment>

        <Segment basic>
          <Container>
            <Feed />
          </Container>
        </Segment>
      </div>
    );
  }
}

export default App;
