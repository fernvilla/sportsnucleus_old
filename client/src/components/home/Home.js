import React, { Component, Fragment } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAllTweets, fetchTweetsByTeams } from './../../actions/tweetsActions';
import { Feed, FavoritesModal } from './../../components';

import './../../stylesheets/home.css';

class Home extends Component {
  componentDidMount() {
    const { fetchAllTweets, fetchTweetsByTeams, favorites } = this.props;

    if (favorites && favorites.length) {
      fetchTweetsByTeams(favorites);
    } else {
      fetchAllTweets();
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
  fetchAllTweets: () => dispatch(fetchAllTweets()),
  fetchTweetsByTeams: teams => dispatch(fetchTweetsByTeams(teams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
