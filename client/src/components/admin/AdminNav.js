import React from 'react';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => {
  return (
    <Segment basic>
      <Container>
        <Menu pointing secondary>
          <Menu.Item as={NavLink} to="/admin/dashboard" name="dashboard" />
          <Menu.Item as={NavLink} to="/admin/leagues" name="leagues" />
          <Menu.Item as={NavLink} to="/admin/teams" name="teams" />
          <Menu.Item as={NavLink} to="/admin/twitterAccounts" name="twitterAccounts" />
          <Menu.Item as={NavLink} to="/admin/users" name="users" />
        </Menu>
      </Container>
    </Segment>
  );
};

export default AdminNav;
