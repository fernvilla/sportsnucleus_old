import React, { Component } from 'react';
import { Card, Loader, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { Tweet } from './../../components';
import momentCustom from './../../utils/momentCustom';
import { fetchTweets } from './../../actions/tweetsActions';

momentCustom();

class Feed extends Component {
  state = {
    tweets: [],
    tweetsFetched: false
  };

  componentDidMount() {
    this.props.fetchTweets();
  }

  renderFeed() {
    const { tweets } = this.props;

    if (!tweets.length) return <div> Nothing to see here...</div>;

    return tweets.map(tweet => <Tweet tweet={tweet} key={tweet._id} />);
  }

  render() {
    const { fetchingTweets } = this.props;

    if (fetchingTweets) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <Container>
        <Masonry
          options={{
            itemSelector: '.card',
            percentPosition: true,
            transitionDuration: 0
          }}>
          <Card.Group itemsPerRow={3} stackable doubling>
            {this.renderFeed()}
          </Card.Group>
        </Masonry>
      </Container>
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
)(Feed);
