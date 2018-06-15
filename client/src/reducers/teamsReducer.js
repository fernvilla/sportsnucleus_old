import { FETCH_TEAMS_ERROR, FETCHING_TEAMS, FETCH_TEAMS_SUCCESS } from './../actions/types';

export const fetchTeamsError = (state = false, action) => {
  switch (action.type) {
    case FETCH_TEAMS_ERROR:
      return action.hasErrored;

    default:
      return state;
  }
};

export const fetchingTeams = (state = true, action) => {
  switch (action.type) {
    case FETCHING_TEAMS:
      return action.isFetching;

    default:
      return state;
  }
};

export const teams = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEAMS_SUCCESS:
      return action.teams;

    default:
      return state;
  }
};
