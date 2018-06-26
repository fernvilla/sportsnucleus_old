import React, { Component, Fragment } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchLatestTweets, fetchLatestTweetsByTeams } from './../../actions/tweetsActions';
import { Feed, FavoritesModal } from './../../components';

import './../../stylesheets/home.css';

class Home extends Component {
  componentDidMount() {
    const { fetchLatestTweets, fetchLatestTweetsByTeams, favorites } = this.props;

    if (favorites && favorites.length) {
      fetchLatestTweetsByTeams(favorites);
    } else {
      fetchLatestTweets();
    }
  }

  renderFeed() {
    const { fetchingTweets, tweets } = this.props;

    return <Feed items={tweets} isLoading={fetchingTweets} />;
  }

  render() {
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

        {this.renderFeed()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.tweets,
  favorites: state.favorites,
  fetchingTweets: state.fetchingTweets
});

const mapDispatchToProps = dispatch => ({
  fetchLatestTweets: () => dispatch(fetchLatestTweets()),
  fetchLatestTweetsByTeams: teams => dispatch(fetchLatestTweetsByTeams(teams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
