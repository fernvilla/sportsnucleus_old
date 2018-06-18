import axios from 'axios';

import {
  FETCHING_LEAGUES,
  FETCH_LEAGUES_ERROR,
  FETCH_LEAGUES_SUCCESS,
  FETCHING_LEAGUE,
  FETCH_LEAGUE_ERROR,
  FETCH_LEAGUE_SUCCESS
} from './types';

export const fetchingLeagues = bool => ({
  type: FETCHING_LEAGUES,
  isFetching: bool
});

export const fetchLeaguesError = bool => ({
  type: FETCH_LEAGUES_ERROR,
  hasErrored: bool
});

export const fetchLeaguesSuccess = leagues => ({
  type: FETCH_LEAGUES_SUCCESS,
  leagues
});

export const fetchLeagues = () => dispatch => {
  dispatch(fetchingLeagues(true));

  axios
    .get('/api/leagues')
    .then(({ data }) => {
      dispatch(fetchLeaguesSuccess(data));
      dispatch(fetchingLeagues(false));
    })
    .catch(err => {
      dispatch(fetchingLeagues(false));
      dispatch(fetchLeaguesError(true));
    });
};

export const fetchingLeague = bool => ({
  type: FETCHING_LEAGUE,
  isFetching: bool
});

export const fetchLeagueError = bool => ({
  type: FETCH_LEAGUE_ERROR,
  hasErrored: bool
});

export const fetchLeagueSuccess = league => ({
  type: FETCH_LEAGUE_SUCCESS,
  league
});

export const fetchLeague = league => dispatch => {
  dispatch(fetchingLeague(true));

  axios
    .get(`/api/leagues/${league}`)
    .then(res => {
      dispatch(fetchLeagueSuccess(res.data));
      dispatch(fetchingLeague(false));
    })
    .catch(err => {
      dispatch(fetchLeagueError(true));
    });
};
