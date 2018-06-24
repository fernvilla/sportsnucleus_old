import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { addFavoriteTeam, removeFavoriteTeam } from './../../actions/favoritesActions';

import './../../stylesheets/favorites.css';

class FavoritesModal extends Component {
  state = {
    showModal: false,
    hoveredLeague: ''
  };

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  addFavorite = team => {
    this.props.addFavoriteTeam(team);
  };

  removeFavorite = team => {
    this.props.removeFavoriteTeam(team);
  };

  setHoveredLeague = league => {
    this.setState({ hoveredLeague: league });
  };

  selectTeam = (e, team) => {
    const { favorites } = this.props;
    const selected = favorites.indexOf(team) > -1;

    if (!selected) {
      return this.addFavorite(team);
    }

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
    const { leagues, favorites } = this.props;
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
                const selected = favorites.indexOf(team.shortName) > -1;

                return (
                  <div
                    className={classNames('favorites-team', {
                      selected: selected
                    })}
                    onClick={e => this.selectTeam(e, team.slug)}
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

  render() {
    const { showModal } = this.state;
    const { favorites } = this.props;

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
          <div>
            <div className="favorites-container">
              <h2>Set My Teams</h2>

              <div className="favorites-section">
                {this.renderLeagues()}
                {this.renderTeams()}
              </div>

              {!!favorites.length && (
                <div>
                  <Divider inverted />

                  <h3>Current Teams</h3>

                  {favorites.map((favorite, i) => {
                    return <p key={i}>{favorite}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

FavoritesModal.propTypes = {
  favorites: PropTypes.array.isRequired,
  leagues: PropTypes.array.isRequired,
  addFavoriteTeam: PropTypes.func.isRequired,
  removeFavoriteTeam: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { favorites, leagues } = state;

  return { favorites, leagues };
};

const mapDispatchToProps = dispatch => ({
  addFavoriteTeam: team => dispatch(addFavoriteTeam(team)),
  removeFavoriteTeam: team => dispatch(removeFavoriteTeam(team))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesModal);
