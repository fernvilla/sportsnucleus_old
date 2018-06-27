import { ADD_BOOKMARKED_ITEM, REMOVE_BOOKMARKED_ITEM } from './../actions/types';

export const bookmarks = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKMARKED_ITEM:
      return [...state, action.item];

    case REMOVE_BOOKMARKED_ITEM:
      return state.filter(item => item !== action.item);

    default:
      return state;
  }
};
