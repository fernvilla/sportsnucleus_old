import React from 'react';
import { Container, Menu, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = ({ leagues }) => {
  return (
    <Menu borderless fluid inverted fixed="top" color="black" size="large">
      <Container>
        <NavLink to="/" activeClassName="active">
          <Menu.Item name="home" />
        </NavLink>

        <Dropdown item simple text="Teams">
          <Dropdown.Menu>
            {leagues.map(league => {
              return (
                <Dropdown.Item key={league._id}>
                  <i className="dropdown icon" />
                  <span className="text">{league.shortName}</span>

                  <Dropdown.Menu>
                    {league.teams.map(team => {
                      return (
                        <Dropdown.Item key={team._id}>
                          <NavLink to={`/teams/${team.canonical}`} className="nav-link">
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
  );
};

export default Nav;
