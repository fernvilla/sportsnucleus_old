import React, { Component, Fragment } from 'react';
import { Container, Header, Button, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchTweets } from './../../actions/tweetsActions';
import { Feed } from './../../components';

class Home extends Component {
  componentDidMount() {
    this.props.fetchTweets();
  }

  render() {
    const { fetchingTweets, tweets } = this.props;

    if (fetchingTweets) {
      return <Loader active inline="centered" size="large" />;
    }

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
          <Feed items={tweets} />
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets,
  fetchingTweets: state.fetchingTweets
});

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
