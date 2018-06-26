import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Dropdown, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './../../actions/authActions';
import './../../stylesheets/nav.css';

class SiteNav extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    const {
      leagues,
      favorites
      // auth: {
      //   isAuthenticated,
      //   user: { isAdmin }
      // }
    } = this.props;

    // const authLinks = (
    //   <Menu.Menu position="right">
    //     <Link to="/profile">
    //       <Menu.Item name="profile" />
    //     </Link>

    //     {isAdmin && (
    //       <Link to="/admin/dashboard">
    //         <Menu.Item name="admin dashboard" />
    //       </Link>
    //     )}

    //     <Menu.Item name="logout" link onClick={this.onLogoutClick} />
    //   </Menu.Menu>
    // );

    // const guestLinks = (
    //   <Menu.Menu position="right">
    //     <Link to="/login">
    //       <Menu.Item name="login" />
    //     </Link>

    //     <Link to="signup">
    //       <Menu.Item name="signup" />
    //     </Link>
    //   </Menu.Menu>
    // );

    return (
      <Segment basic>
        <Menu borderless fluid inverted fixed="top" color="black" size="large">
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

            <Dropdown item simple text="My Teams">
              <Dropdown.Menu>
                {favorites.map(favorite => {
                  return (
                    <Dropdown.Item key={favorite}>
                      <Link to={`/teams/${favorite}`} className="nav-link text-capitalize">
                        {favorite.replace(/-/g, ' ')}
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            {/*{isAuthenticated ? authLinks : guestLinks}*/}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  leagues: state.leagues,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteNav);
