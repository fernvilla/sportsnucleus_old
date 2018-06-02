import React from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Segment basic>
      <Menu borderless fluid inverted fixed="top" color="black" size="large">
        <Container>
          <NavLink to="/admin" activeClassName="active">
            <Menu.Item name="Dashboard" />
          </NavLink>

          <NavLink to="/admin/leagues" activeClassName="active">
            <Menu.Item name="Leagues" />
          </NavLink>
        </Container>
      </Menu>
    </Segment>
  );
};

export default Nav;
