import React, { Component } from 'react';
import axios from 'axios';
import { Card, Loader, Container } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import { Tweet } from '.';
// import InfiniteScroll from 'react-infinite-scroller';
import momentCustom from './../utils/momentCustom';

momentCustom();

export default class Feed extends Component {
  state = {
    tweets: [],
    tweetsFetched: false
  };

  componentDidMount() {
    this.fetchTweets();
  }

  fetchTweets = () => {
    axios
      .get(`${this.props.path}`)
      .then(({ data }) => {
        console.log(data);

        this.setState({ tweets: data.payload, tweetsFetched: true });
      })
      .catch(err => console.error(err));
  };

  renderFeed() {
    const { tweets } = this.state;

    if (!tweets.length) return <div> Nothing to see here...</div>;

    return tweets.map(tweet => <Tweet tweet={tweet} key={tweet._id} />);
  }

  render() {
    const { tweetsFetched } = this.state;

    if (!tweetsFetched) {
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
