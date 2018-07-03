import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Loader } from './../../components';
import Feed from './Feed';
import TeamHeader from './TeamHeader';
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

    if (team !== currentTeam) this.fetchTeam(team);
  }

  fetchTeam(team) {
    this.props.fetchTeam(team);
  }

  render() {
    const { team, fetchingTeam } = this.props;

    if (fetchingTeam) {
      return <Loader />;
    }

    return (
      <DocumentTitle title={`Sports Nucleus - ${team.name}`}>
        <div className="team-page">
          <TeamHeader team={team} />
          <Feed team={team.slug} />;
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
