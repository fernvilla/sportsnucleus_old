import axios from 'axios';

import { FETCHING_LEAGUES, FETCH_LEAGUES_ERROR, FETCH_LEAGUES_SUCCESS } from './types';

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
