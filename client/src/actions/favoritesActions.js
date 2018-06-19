import { ADD_FAVORITE_TEAM, REMOVE_FAVORITE_TEAM } from './types';

export const addFavoriteTeam = team => ({
  type: ADD_FAVORITE_TEAM,
  team
});

export const removeFavoriteTeam = team => ({
  type: REMOVE_FAVORITE_TEAM,
  team
});
