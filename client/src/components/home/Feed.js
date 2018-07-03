import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Segment, Menu, Icon, Label } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { connect } from 'react-redux';

import { Tweet, Loader } from './../../components';
import './../../stylesheets/feed.css';

class Feed extends Component {
  static propTypes = {
    favorites: PropTypes.array
  };

  static defaultProps = {
    favorites: []
  };

  recordsPerPage = 20;

  constructor(props) {
    super(props);

    const { favorites } = this.props;
    const hasFavorites = favorites && favorites.length;

    this.state = {
      hasMore: true,
      items: [],
      show: hasFavorites ? 'Favorites' : 'All'
    };
  }

  changeShown = show => {
    if (show !== this.state.show) {
      this.setState({ show, items: [], hasMore: true }, () => {
        this.fetchHandler();
      });
    }
  };

  fetchHandler = page => {
    const { show } = this.state;

    switch (show) {
      case 'All':
        return this.fetchAll(page);
      case 'Favorites':
        return this.fetchByFavorites(page);
      default:
        return;
    }
  };

  fetchAll = page => {
    console.log('page', page);

    axios
      .post('/api/tweets/paginated', {
        currentPage: page,
        recordsPerPage: this.recordsPerPage
      })
      .then(({ data }) => {
        console.log(data);

        if (!data.length) return this.setState({ hasMore: false });

        this.setState(prevState => ({
          items: [...prevState.items, ...data]
        }));
      })
      .catch(err => console.error(err));
  };

  fetchByFavorites = page => {
    console.log('page', page);

    const { favorites } = this.props;

    axios
      .post('/api/tweets/teams/paginated', {
        currentPage: page,
        recordsPerPage: this.recordsPerPage,
        teams: favorites
      })
      .then(({ data }) => {
        console.log(data);

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
    const { hasMore, show } = this.state;
    const { favorites } = this.props;

    return (
      <div>
        <Menu borderless fluid>
          <Container>
            <Menu.Item header>
              <Icon name="feed" />Feed:
            </Menu.Item>

            <Menu.Item active={show === 'Favorites'} onClick={() => this.changeShown('Favorites')}>
              My Teams
              <Label color="blue">{favorites.length}</Label>
            </Menu.Item>

            <Menu.Item
              name="All Teams"
              active={show === 'All'}
              onClick={() => this.changeShown('All')}
            />
          </Container>
        </Menu>

        <Segment basic className="feed-container">
          <Container fluid>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.fetchHandler}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  null
)(Feed);
