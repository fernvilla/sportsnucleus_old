import React, { Component } from 'react';
import { Menu, Container, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAllTweets, fetchTweetsByTeams } from './../../actions/tweetsActions';

class Filter extends Component {
  state = { activeFilter: 'All' };

  componentDidMount() {
    const { favorites } = this.props;

    if (favorites && favorites.length) {
      this.changeFilter('Favorites');
    }
  }

  changeFilter = filter => {
    const { fetchAllTweets, fetchTweetsByTeams, favorites } = this.props;

    if (filter !== this.state.activeFilter) {
      this.setState({ activeFilter: filter }, () => {
        switch (filter) {
          case 'All':
            return fetchAllTweets();

          case 'Favorites':
            return fetchTweetsByTeams(favorites);

          default:
            return;
        }
      });
    }
  };

  render() {
    const { favorites } = this.props;
    const { activeFilter } = this.state;

    return (
      <Menu borderless fluid>
        <Container>
          <Menu.Item header>Show:</Menu.Item>

          <Menu.Item
            active={activeFilter === 'Favorites'}
            onClick={() => this.changeFilter('Favorites')}>
            My Teams
            <Label color="blue">{favorites.length}</Label>
          </Menu.Item>

          <Menu.Item
            name="All"
            active={activeFilter === 'All'}
            onClick={() => this.changeFilter('All')}
          />

          {/*<Menu.Menu position="right">
            <Menu.Item header>Filter:</Menu.Item>

            <Menu.Item
              name="Team"
              active={activeFilter === 'Team'}
              onClick={() => this.changeFilter('Team')}
            />

            <Menu.Item
              name="Player"
              active={activeFilter === 'Tweet'}
              onClick={() => this.changeFilter('Tweet')}
            />

            <Menu.Item
              name="Media"
              active={activeFilter === 'Article'}
              onClick={() => this.changeFilter('Article')}
            />

            <Menu.Item position="right">
              <Input className="icon" icon="search" placeholder="Search..." />
            </Menu.Item>
    </Menu.Menu>*/}
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  fetchAllTweets: () => dispatch(fetchAllTweets()),
  fetchTweetsByTeams: teams => dispatch(fetchTweetsByTeams(teams))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
