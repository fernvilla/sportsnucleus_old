import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <Container>
      <Menu secondary inverted pointing size="large">
        <NavLink to="/" activeClassName="active">
          <Menu.Item name="home" />
        </NavLink>

        <Menu.Item name="teams" />
      </Menu>
    </Container>
  );
};

export default Nav;
