import React, { Component } from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import { Tweet } from '.';

export default class Feed extends Component {
  state = {
    tweets: [],
    tweetsFetched: false
  };

  componentDidMount() {
    this.fetchTweets();
  }

  fetchTweets() {
    axios
      .get('/api/tweets')
      .then(({ data }) => {
        this.setState({ tweets: data, tweetsFetched: true });
      })
      .catch(err => console.error(err));
  }

  renderFeed() {
    const { tweets } = this.state;

    return tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id} />);
  }

  render() {
    const { tweetsFetched } = this.state;

    if (!tweetsFetched) return null;

    return (
      <div>
        <Masonry
          options={{
            itemSelector: '.card',
            percentPosition: true,
            transitionDuration: 0
          }}>
          <Card.Group itemsPerRow={4} stackable doubling>
            {this.renderFeed()}
          </Card.Group>
        </Masonry>
      </div>
    );
  }
}
