import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Loader } from 'semantic-ui-react';
import { Feed, TeamHeader } from './../../components';
import { fetchTeam } from './../../actions/teamsActions';

class Team extends Component {
  componentDidMount() {
    const {
      match: {
        params: { team }
      }
    } = this.props;

    this.fetchTeam(team);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { team }
      }
    } = nextProps;
    const currentTeam = this.props.match.params.team;

    if (team !== currentTeam) {
      this.fetchTeam(team);
    }
  }

  fetchTeam(team) {
    this.props.fetchTeam(team);
  }

  renderFeed() {
    const { team, fetchingTeam, hasErrored } = this.props;

    if (fetchingTeam) {
      return <Loader active inline="centered" size="large" />;
    }

    if (hasErrored) {
      return <p>Error fetching team</p>;
    }

    return <Feed items={team.tweets} />;
  }

  render() {
    const { team } = this.props;

    return (
      <DocumentTitle title={`Sports Nucleus - ${team.name}`}>
        <div className="team-page">
          <TeamHeader team={team} />

          {this.renderFeed()}
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  team: state.team,
  hasErrored: state.fetchTeamError,
  fetchingTeam: state.fetchingTeam
});

const mapDispatchToProps = dispatch => ({
  fetchTeam: team => dispatch(fetchTeam(team))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);
