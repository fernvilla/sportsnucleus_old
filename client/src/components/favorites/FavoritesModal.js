import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addFavoriteTeam, removeFavoriteTeam } from './../../actions/favoritesActions';
import Favorite from './Favorite';

class FavoritesModal extends Component {
  state = {
    showModal: false
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

  renderTeams() {
    const { leagues, favorites } = this.props;
    const testTeam = 'lakers';
    const selected = favorites.indexOf(testTeam) > -1;

    return (
      <Favorite
        team={{ shortName: testTeam }}
        addFavorite={this.addFavorite}
        removeFavorite={this.removeFavorite}
        selected={selected}
      />
    );

    // return teams.map(team => {
    //   const { name, canonical } = team;
    //   const selected = favorites.indexOf(canonical) > -1;

    //   return (
    //     <Favorite
    //       team={team}
    //       addFavorite={this.addFavorite}
    //       removeFavorite={this.removeFavorite}
    //       selected={selected}
    //     />
    //   );
    // });
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
          size="tiny"
          closeIcon
          open={showModal}>
          <Modal.Header>Set Your Favorites</Modal.Header>

          <Modal.Content>
            <Modal.Description>{this.renderTeams()}</Modal.Description>
          </Modal.Content>
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
