import { ADD_BOOKMARKED_ITEM, REMOVE_BOOKMARKED_ITEM } from './types';

export const addBookmarkedItem = item => ({
  type: ADD_BOOKMARKED_ITEM,
  item
});

export const removeBookmarkedItem = item => ({
  type: REMOVE_BOOKMARKED_ITEM,
  item
});
