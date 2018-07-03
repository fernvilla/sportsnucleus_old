import React, { Fragment } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { FavoritesModal } from './../../components';
import Feed from './Feed';

import './../../stylesheets/home.css';

const Home = () => {
  return (
    <Fragment>
      <Segment inverted vertical className="hero" textAlign="center">
        <Container text>
          <Header as="h1" inverted className="hero-main">
            Sports Nucleus
          </Header>

          <Header as="h2" inverted className="hero-secondary">
            The center of your sports universe.
          </Header>

          <FavoritesModal />
        </Container>
      </Segment>

      <Feed />
    </Fragment>
  );
};

export default Home;
