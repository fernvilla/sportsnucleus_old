import React, { Component } from 'react';
import { Menu, Input, Container, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Filter extends Component {
  state = { activeFilter: 'Favorites' };

  handleFilterClick = filter => {
    this.setState({ activeFilter: filter });
  };

  render() {
    // const { leagues } = this.props;
    const { activeFilter } = this.state;

    return (
      <Menu borderless fluid>
        <Container>
          <Menu.Item header>Show:</Menu.Item>

          <Menu.Item
            name="My Teams"
            active={activeFilter === 'Favorites'}
            onClick={() => this.handleFilterClick('Favorites')}
          />

          <Menu.Item
            name="All"
            active={activeFilter === 'All'}
            onClick={() => this.handleFilterClick('All')}
          />

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

          {/*<Dropdown item simple text="Team Feeds">
            <Dropdown.Menu>
              {leagues.map(league => {
                return (
                  <Dropdown.Item key={league._id}>
                    <i className="dropdown icon" />
                    {league.shortName}

                    <Dropdown.Menu>
                      {league.teams.map(team => {
                        return <Dropdown.Item key={team._id}>{team.name}</Dropdown.Item>;
                      })}
                    </Dropdown.Menu>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
            */}

          <Menu.Item position="right">
            <Input className="icon" icon="search" placeholder="Filter..." />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  leagues: state.leagues
});

export default connect(
  mapStateToProps,
  null
)(Filter);
