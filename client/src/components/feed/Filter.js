import React, { Component } from 'react';
import { Menu, Input, Container, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Filter extends Component {
  state = { activeFilter: 'Favorites' };

  handleFilterClick = filter => {
    this.setState({ activeFilter: filter });
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
            onClick={() => this.handleFilterClick('Favorites')}>
            My Teams
            <Label color="blue">{favorites.length}</Label>
          </Menu.Item>

          <Menu.Item
            name="All"
            active={activeFilter === 'All'}
            onClick={() => this.handleFilterClick('All')}
          />

          <Menu.Menu position="right">
            <Menu.Item header>Filter:</Menu.Item>

            <Menu.Item
              name="Team"
              active={activeFilter === 'Team'}
              onClick={() => this.handleFilterClick('Team')}
            />

            <Menu.Item
              name="Player"
              active={activeFilter === 'Tweet'}
              onClick={() => this.handleFilterClick('Tweet')}
            />

            <Menu.Item
              name="Media"
              active={activeFilter === 'Article'}
              onClick={() => this.handleFilterClick('Article')}
            />

            <Menu.Item position="right">
              <Input className="icon" icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  null
)(Filter);
