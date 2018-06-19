import { ADD_FAVORITE_TEAM, REMOVE_FAVORITE_TEAM } from './../actions/types';

export const favorites = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE_TEAM:
      return [...state, action.team];

    case REMOVE_FAVORITE_TEAM:
      return state.filter(team => team !== action.team);

    default:
      return state;
  }
};
