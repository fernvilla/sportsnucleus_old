import {
  FETCH_LEAGUES_ERROR,
  FETCHING_LEAGUES,
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUE_SUCCESS,
  FETCHING_LEAGUE
} from './../actions/types';

export const fetchLeaguesError = (state = false, action) => {
  switch (action.type) {
    case FETCH_LEAGUES_ERROR:
      return action.hasErrored;

    default:
      return state;
  }
};

export const fetchingLeagues = (state = true, action) => {
  switch (action.type) {
    case FETCHING_LEAGUES:
      return action.isFetching;

    default:
      return state;
  }
};

export const leagues = (state = [], action) => {
  switch (action.type) {
    case FETCH_LEAGUES_SUCCESS:
      return action.leagues;

    default:
      return state;
  }
};

export const fetchingLeague = (state = true, action) => {
  switch (action.type) {
    case FETCHING_LEAGUE:
      return action.isFetching;

    default:
      return state;
  }
};

export const league = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LEAGUE_SUCCESS:
      return action.league;

    default:
      return state;
  }
};
