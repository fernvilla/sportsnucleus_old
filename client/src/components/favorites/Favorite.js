import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import classNames from 'classnames';

export default class FavoriteTeam extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    team: PropTypes.object.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  constructor(props) {
    super(props);

    this.state = { selected: props.selected };
  }

  selectTeam = () => {
    const {
      addFavorite,
      removeFavorite,
      team: { shortName }
    } = this.props;

    this.setState(
      prevState => ({ selected: !prevState.selected }),
      () => {
        if (this.state.selected) {
          return addFavorite(shortName);
        }

        return removeFavorite(shortName);
      }
    );
  };

  render() {
    const {
      team: { shortName }
    } = this.props;

    return (
      <div
        className={classNames('team-container', {
          selected: this.state.selected
        })}
        onClick={this.selectTeam}>
        {shortName}
      </div>
    );
  }
}
