import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Loader } from './../../components';
import Feed from './Feed';
import LeagueHeader from './LeagueHeader';
import { fetchLeague } from './../../actions/leaguesActions';

class League extends Component {
  componentDidMount() {
    const {
      match: {
        params: { league }
      }
    } = this.props;

    this.fetchLeague(league);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { league }
      }
    } = nextProps;
    const currentLeague = this.props.match.params.league;

    if (league !== currentLeague) {
      this.fetchLeague(league);
    }
  }

  fetchLeague(league) {
    this.props.fetchLeague(league);
  }

  render() {
    const { league, fetchingLeague } = this.props;

    if (fetchingLeague) {
      return <Loader />;
    }

    return (
      <DocumentTitle title={`Sports Nucleus - ${league.name}`}>
        <div className="league-page">
          <LeagueHeader league={league} />
          <Feed league={league.slug} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  league: state.league,
  hasErrored: state.fetchLeagueError,
  fetchingLeague: state.fetchingLeague
});

const mapDispatchToProps = dispatch => ({
  fetchLeague: league => dispatch(fetchLeague(league))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(League);
