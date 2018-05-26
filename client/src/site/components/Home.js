import React, { Fragment } from 'react';
import { Container, Header, Button, Segment } from 'semantic-ui-react';
import { Feed } from './';

const Home = () => {
  return (
    <Fragment>
      <Segment inverted vertical className="hero" textAlign="center">
        <Container text>
          <Header as="h1" inverted className="hero-main">
            Sports Nucleus
          </Header>

          <Header as="h2" inverted className="hero-secondary">
            The center of your sports news universe
          </Header>

          <Button inverted size="large">
            My Teams
          </Button>
        </Container>
      </Segment>

      <Segment basic>
        <Feed path="/api/tweets/paginated" />
      </Segment>
    </Fragment>
  );
};

export default Home;
