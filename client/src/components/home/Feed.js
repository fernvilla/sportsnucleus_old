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

    const {
      profile: { favorites }
    } = this.props;

    this.state = {
      hasMore: true,
      items: [],
      show: favorites && !!favorites.length ? 'Favorites' : 'All',
      currentPage: 1
    };
  }

  componentDidMount() {
    this.fetchHandler();
  }

  changeShown = show => {
    if (show !== this.state.show) {
      this.setState(
        {
          show,
          items: [],
          hasMore: true,
          currentPage: 1
        },
        () => this.fetchHandler()
      );
    }
  };

  fetchHandler = () => {
    const { show, currentPage } = this.state;

    switch (show) {
      case 'All':
        return this.fetchAll(currentPage);
      case 'Favorites':
        return this.fetchByFavorites(currentPage);
      default:
        return;
    }
  };

  fetchAll = page => {
    axios
      .post('/api/tweets/paginated', {
        currentPage: page,
        recordsPerPage: this.recordsPerPage
      })
      .then(({ data }) => {
        if (!data.length) return this.setState({ hasMore: false });

        this.setState(prevState => ({
          items: [...prevState.items, ...data],
          currentPage: prevState.currentPage + 1
        }));
      })
      .catch(err => console.error(err));
  };

  fetchByFavorites = page => {
    const {
      profile: { favorites }
    } = this.props;
    const slugs = favorites.map(f => f.slug);

    axios
      .post('/api/tweets/teams/paginated', {
        currentPage: page,
        recordsPerPage: this.recordsPerPage,
        teams: slugs
      })
      .then(({ data }) => {
        if (!data.length) return this.setState({ hasMore: false });

        this.setState(prevState => ({
          items: [...prevState.items, ...data],
          currentPage: prevState.currentPage + 1
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
    const { profile } = this.props;
    const favorites = profile ? (profile.favorites ? profile.favorites : []) : [];

    return (
      <div>
        <Menu borderless fluid>
          <Container>
            <Menu.Item header>
              <Icon name="feed" />View Feed:
            </Menu.Item>

            <Menu.Item
              name="All Teams"
              active={show === 'All'}
              onClick={() => this.changeShown('All')}
            />

            <Menu.Item active={show === 'Favorites'} onClick={() => this.changeShown('Favorites')}>
              My Teams
              <Label color="blue">{favorites.length}</Label>
            </Menu.Item>
          </Container>
        </Menu>

        <Segment basic className="feed-container">
          <Container fluid>
            <InfiniteScroll
              loadMore={this.fetchHandler}
              hasMore={hasMore}
              initialLoad={false}
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
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(Feed);
