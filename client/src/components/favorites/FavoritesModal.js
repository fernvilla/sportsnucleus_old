import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { addFavorite, removeFavorite } from './../../actions/profileActions';

import './../../stylesheets/favorites.css';

class FavoritesModal extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    showModal: false,
    hoveredLeague: ''
  };

  handleOpen = () => {
    const {
      auth: { isAuthenticated }
    } = this.props;

    if (!isAuthenticated) return this.context.router.history.push('/login');

    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  addFavorite = team => {
    const { addFavorite } = this.props;
    addFavorite(team);
  };

  removeFavorite = team => {
    const { removeFavorite } = this.props;

    removeFavorite(team);
  };

  setHoveredLeague = league => {
    this.setState({ hoveredLeague: league });
  };

  selectTeam = (e, team) => {
    const { profile } = this.props;
    const favorites = profile ? (profile.favorites ? profile.favorites : []) : [];
    const selected = !!favorites.length && favorites.map(item => item._id).indexOf(team._id) > -1;

    if (!selected) return this.addFavorite(team);

    return this.removeFavorite(team);
  };

  renderLeagues() {
    const { leagues } = this.props;
    const { hoveredLeague } = this.state;

    return (
      <div className="favorites-leagues">
        <p className="favorites-leagues-header">Leagues</p>

        {leagues.map(league => {
          const selected = hoveredLeague === league.shortName;

          return (
            <div
              className={classNames('favorites-league', {
                selected
              })}
              key={league._id}
              onMouseEnter={() => this.setHoveredLeague(league.shortName)}>
              {league.shortName}

              <Icon inverted name="chevron right" color={selected ? 'blue' : 'grey'} />
            </div>
          );
        })}
      </div>
    );
  }

  renderTeams() {
    const { leagues, profile } = this.props;
    const { hoveredLeague } = this.state;

    return (
      <div className="favorites-teams">
        {leagues.map(league => {
          return (
            <div
              className={classNames('favorites-team-league', {
                visible: hoveredLeague === league.shortName
              })}
              key={league._id}>
              {league.teams.map(team => {
                const selected =
                  profile &&
                  profile.favorites &&
                  profile.favorites.map(item => item._id).indexOf(team._id) > -1;

                return (
                  <div
                    className={classNames('favorites-team', {
                      selected: selected
                    })}
                    onClick={e => this.selectTeam(e, team)}
                    key={team._id}>
                    {team.shortName}

                    <Icon
                      inverted
                      name={`${selected ? 'minus' : 'plus'} circle`}
                      color={selected ? 'blue' : 'grey'}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  renderFavorites() {
    const { profile } = this.props;

    if (!profile) return null;

    const { favorites } = profile;

    return (
      favorites &&
      !!favorites.length && (
        <div>
          <Divider inverted />

          <h3>Current Teams</h3>

          {favorites.map((favorite, i) => (
            <p key={i} className="favorites-current-team">
              {favorite.name}
            </p>
          ))}
        </div>
      )
    );
  }

  render() {
    const { showModal } = this.state;

    return (
      <div>
        <Modal
          trigger={
            <Button inverted size="large" onClick={this.handleOpen}>
              Set My Teams
            </Button>
          }
          onClose={this.handleClose}
          size="small"
          closeIcon
          open={showModal}
          centered={false}>
          <Modal.Content className="favorites-container">
            <h2>Set My Teams</h2>

            <div className="favorites-section">
              {this.renderLeagues()}
              {this.renderTeams()}
            </div>

            {this.renderFavorites()}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

FavoritesModal.propTypes = {
  profile: PropTypes.object,
  leagues: PropTypes.array.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

FavoritesModal.defaultProps = {
  profile: {}
};

const mapStateToProps = ({ profile, leagues, auth }) => ({ profile, leagues, auth });

const mapDispatchToProps = dispatch => ({
  addFavorite: team => dispatch(addFavorite(team)),
  removeFavorite: team => dispatch(removeFavorite(team))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesModal);
