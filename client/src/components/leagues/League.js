import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Feed, LeagueHeader, Loader } from './../../components';
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

  renderFeed() {
    const { league, fetchingLeague, hasErrored } = this.props;

    if (fetchingLeague) {
      return <Loader />;
    }

    if (hasErrored) {
      return <p>Error fetching league</p>;
    }

    let tweets = [];

    league.teams.map(team => {
      return team.tweets.map(t => {
        t.team = team;

        return tweets.push(t);
      });
    });

    tweets = tweets.sort((a, b) => new Date(a) - new Date(b));

    return <Feed items={tweets} />;
  }

  render() {
    const { league } = this.props;

    return (
      <DocumentTitle title={`Sports Nucleus - ${league.name}`}>
        <div className="league-page">
          <LeagueHeader league={league} />

          {this.renderFeed()}
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
