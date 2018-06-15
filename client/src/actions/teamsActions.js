import axios from 'axios';

import { FETCHING_TEAMS, FETCH_TEAMS_ERROR, FETCH_TEAMS_SUCCESS } from './types';

export const fetchingTeams = bool => ({
  type: FETCHING_TEAMS,
  isFetching: bool
});

export const fetchTeamsError = bool => ({
  type: FETCH_TEAMS_ERROR,
  hasErrored: bool
});

export const fetchTeamsSuccess = teams => ({
  type: FETCH_TEAMS_SUCCESS,
  teams
});

export const fetchTeams = () => dispatch => {
  dispatch(fetchingTeams(true));

  axios
    .get('/api/teams')
    .then(({ data }) => {
      dispatch(fetchTeamsSuccess(data));
      dispatch(fetchingTeams(false));
    })
    .catch(err => {
      dispatch(fetchingTeams(false));
      dispatch(fetchTeamsError(true));
    });
};
