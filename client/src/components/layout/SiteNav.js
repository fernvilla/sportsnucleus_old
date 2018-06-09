import React from 'react';
import { Container, Menu, Dropdown, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SiteNav = ({ leagues }) => {
  return (
    <Segment basic>
      <Menu borderless fluid inverted fixed="top" color="black" size="large">
        <Container>
          <Link to="/">
            <Menu.Item name="home" />
          </Link>

          <Dropdown item simple text="Team Feeds">
            <Dropdown.Menu>
              {leagues.map(league => {
                return (
                  <Dropdown.Item key={league._id}>
                    <i className="dropdown icon" />
                    <Link to={`/leagues/${league.slug}`} className="nav-link">
                      {league.shortName}
                    </Link>

                    <Dropdown.Menu>
                      {league.teams.map(team => {
                        return (
                          <Dropdown.Item key={team._id}>
                            <Link to={`/teams/${team.slug}`} className="nav-link">
                              {team.name}
                            </Link>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right">
            <Link to="/login">
              <Menu.Item name="login" />
            </Link>

            <Link to="signup">
              <Menu.Item name="signup" />
            </Link>
          </Menu.Menu>
        </Container>
      </Menu>
    </Segment>
  );
};

export default SiteNav;
