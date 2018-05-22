import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

const Home = () => {
  return (
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
  );
};

export default Home;
