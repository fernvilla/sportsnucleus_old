import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Container, Segment } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { Tweet, Loader } from './../../components';

import './../../stylesheets/feed.css';

class Feed extends Component {
  state = {
    hasMore: true,
    items: []
  };

  static propTypes = {
    team: PropTypes.string.isRequired
  };

  recordsPerPage = 20;

  fetchTweets = page => {
    const { team } = this.props;

    axios
      .post('/api/tweets/teams/paginated', {
        currentPage: page,
        recordsPerPage: this.recordsPerPage,
        teams: [team]
      })
      .then(({ data }) => {
        if (!data.length) return this.setState({ hasMore: false });

        this.setState(prevState => ({
          items: [...prevState.items, ...data]
        }));
      })
      .catch(err => console.error(err));
  };

  renderFeed() {
    const { items } = this.state;

    return items.map(item => <Tweet tweet={item} key={item._id} />);
  }

  render() {
    const { hasMore } = this.state;

    return (
      <Segment basic className="feed-container">
        <Container fluid>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.fetchTweets}
            hasMore={hasMore}
            loader={<Loader key={0} />}>
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
          </InfiniteScroll>
        </Container>
      </Segment>
    );
  }
}

export default Feed;
