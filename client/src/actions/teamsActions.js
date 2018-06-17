import axios from 'axios';

import {
  FETCHING_TEAMS,
  FETCHING_TEAM,
  FETCH_TEAMS_ERROR,
  FETCH_TEAM_ERROR,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAM_SUCCESS
} from './types';

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

export const fetchingTeam = bool => ({
  type: FETCHING_TEAM,
  isFetching: bool
});

export const fetchTeamError = bool => ({
  type: FETCH_TEAM_ERROR,
  hasErrored: bool
});

export const fetchTeamSuccess = team => ({
  type: FETCH_TEAM_SUCCESS,
  team
});

export const fetchTeam = team => dispatch => {
  dispatch(fetchingTeam(true));

  axios
    .get(`/api/teams/${team}`)
    .then(res => {
      dispatch(fetchTeamSuccess(res.data));
      dispatch(fetchingTeam(false));
    })
    .catch(err => {
      dispatch(fetchTeamError(true));
    });
};
