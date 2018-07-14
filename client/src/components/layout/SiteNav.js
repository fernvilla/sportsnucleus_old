import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Dropdown, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './../../actions/authActions';
import { clearCurrentProfile } from './../../actions/profileActions';

import './../../stylesheets/nav.css';

class SiteNav extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    const { clearCurrentProfile, logoutUser } = this.props;

    clearCurrentProfile();
    logoutUser();
  };

  render() {
    const {
      leagues,
      profile,
      auth: {
        isAuthenticated,
        user: { isAdmin }
      }
    } = this.props;

    const favorites = profile ? (profile.favorites ? profile.favorites : []) : [];

    const authLinks = (
      <Menu.Menu position="right">
        {isAdmin && (
          <Link to="/admin/dashboard">
            <Menu.Item name="admin dashboard" />
          </Link>
        )}

        <Menu.Item name="logout" link onClick={this.onLogoutClick} />
      </Menu.Menu>
    );

    const guestLinks = (
      <Menu.Menu position="right">
        <Link to="/login">
          <Menu.Item name="login" />
        </Link>

        <Link to="signup">
          <Menu.Item name="signup" />
        </Link>
      </Menu.Menu>
    );

    const myTeams = () => {
      if (!favorites.length) return null;

      return (
        <Dropdown item simple text="My Teams">
          <Dropdown.Menu>
            {favorites.map(favorite => {
              return (
                <Dropdown.Item key={favorite._id}>
                  <Link to={`/teams/${favorite.slug}`} className="nav-link text-capitalize">
                    {favorite.name}
                  </Link>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    return (
      <Segment basic>
        <Menu borderless fluid inverted fixed="top" color="black" size="huge">
          <Container>
            <Link to="/">
              <Menu.Item>
                <Icon name="home" fitted />
              </Menu.Item>
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

                      <Dropdown.Menu className="dropdown-limited-menu">
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

            {myTeams()}
            {isAuthenticated ? authLinks : guestLinks}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  leagues: state.leagues,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  clearCurrentProfile: () => dispatch(clearCurrentProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteNav);
