import React, { Component } from 'react';
import axios from 'axios';
import { Card, Loader } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import { Tweet } from '.';
import InfiniteScroll from 'react-infinite-scroller';

export default class Feed extends Component {
  state = {
    tweets: [],
    tweetsFetched: false,
    hasMoreItems: true
  };

  componentDidMount() {
    this.fetchTweets();
  }

  fetchTweets = (page = 1) => {
    console.log('fetching page', page);
    axios
      .get(`/api/tweets/paginated_tweets?page=${page}`)
      .then(({ data }) => {
        this.setState(prevState => ({
          tweets: [...prevState.tweets, ...data.tweets],
          tweetsFetched: true,
          hasMoreItems: !data.meta.last_page
        }));
      })
      .catch(err => console.error(err));
  };

  renderFeed() {
    const { tweets } = this.state;

    if (!tweets.length) return <div> Nothing to see here...</div>;

    return tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id} />);
  }

  render() {
    const { tweetsFetched, hasMoreItems } = this.state;

    if (!tweetsFetched) {
      return <Loader active inline="centered" size="large" />;
    }

    return (
      <div>
        <Masonry
          options={{
            itemSelector: '.card',
            percentPosition: true,
            transitionDuration: 0
          }}>
          <InfiniteScroll pageStart={1} loadMore={this.fetchTweets} hasMore={hasMoreItems}>
            <Card.Group itemsPerRow={4} stackable doubling>
              {this.renderFeed()}
            </Card.Group>
          </InfiniteScroll>
        </Masonry>
      </div>
    );
  }
}
