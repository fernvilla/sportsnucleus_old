import axios from 'axios';

import {
  GET_ERRORS,
  CREATING_LEAGUE,
  CREATE_LEAGUE_SUCCESS,
  FETCHING_LEAGUES,
  FETCH_LEAGUES_ERROR,
  FETCH_LEAGUES_SUCCESS
} from './types';

export const creatingLeague = bool => ({
  type: CREATING_LEAGUE,
  isCreating: bool
});

export const leagueCreateSuccess = bool => ({
  type: CREATE_LEAGUE_SUCCESS,
  createSuccess: bool
});

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

export const createLeague = leagueData => dispatch => {
  dispatch(creatingLeague(true));

  axios
    .post('/api/leagues', leagueData)
    .then(res => {
      console.log(res);
      dispatch(creatingLeague(false));
      dispatch(leagueCreateSuccess(true));
    })
    .catch(err => {
      dispatch(creatingLeague(false));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
