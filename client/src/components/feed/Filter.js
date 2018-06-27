import React, { Component } from 'react';
import { Menu, Container, Label, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchLatestTweets, fetchLatestTweetsByTeams } from './../../actions/tweetsActions';

class Filter extends Component {
  state = { show: 'All' };

  componentDidMount() {
    const { favorites } = this.props;

    if (favorites && favorites.length) {
      this.changeShown('Favorites');
    }
  }

  changeShown = show => {
    const { fetchLatestTweets, fetchLatestTweetsByTeams, favorites } = this.props;

    if (show !== this.state.show) {
      this.setState({ show }, () => {
        switch (show) {
          case 'All':
            return fetchLatestTweets();

          case 'Favorites':
            return fetchLatestTweetsByTeams(favorites);

          default:
            return;
        }
      });
    }
  };

  render() {
    const { favorites } = this.props;
    const { show, filter } = this.state;

    return (
      <Menu borderless fluid>
        <Container>
          <Menu.Item header>
            <Icon name="feed" />Feed view:
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

          <Menu.Menu position="right">
            {/*<Menu.Item header>
              <Icon name="filter" />Filter by:
            </Menu.Item>

            <Menu.Item
              name="Team"
              active={filter === 'Team'}
              onClick={() => this.changeFilter('Team')}
            />

            <Menu.Item
              name="Player"
              active={filter === 'Tweet'}
              onClick={() => this.changeFilter('Tweet')}
            />

            <Menu.Item
              name="Media"
              active={filter === 'Article'}
              onClick={() => this.changeFilter('Article')}
            />
            
            <Menu.Item position="right">
              <Input className="icon" icon="search" placeholder="Search..." />
            </Menu.Item>
            */}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  fetchLatestTweets: () => dispatch(fetchLatestTweets()),
  fetchLatestTweetsByTeams: teams => dispatch(fetchLatestTweetsByTeams(teams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
