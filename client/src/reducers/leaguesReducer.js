import { FETCH_LEAGUES_ERROR, FETCHING_LEAGUES, FETCH_LEAGUES_SUCCESS } from './../actions/types';

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
