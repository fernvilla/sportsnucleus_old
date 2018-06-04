import React from 'react';
import { Container, Menu, Dropdown, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = ({ leagues }) => {
  return (
    <Segment basic>
      <Menu borderless fluid inverted fixed="top" color="black" size="large">
        <Container>
          <NavLink to="/" activeClassName="active">
            <Menu.Item name="home" />
          </NavLink>

          <Dropdown item simple text="Team Feeds">
            <Dropdown.Menu>
              {leagues.map(league => {
                return (
                  <Dropdown.Item key={league._id}>
                    <i className="dropdown icon" />
                    <NavLink to={`/leagues/${league.slug}`} className="nav-link">
                      {league.shortName}
                    </NavLink>

                    <Dropdown.Menu>
                      {league.teams.map(team => {
                        return (
                          <Dropdown.Item key={team._id}>
                            <NavLink to={`/teams/${team.slug}`} className="nav-link">
                              {team.name}
                            </NavLink>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </Segment>
  );
};

export default Nav;
