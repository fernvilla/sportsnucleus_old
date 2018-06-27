import store from 'store';

export const loadState = () => {
  try {
    return {
      favorites: store.get('favorites'),
      bookmarks: store.get('bookmarks')
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = state => {
  const { favorites, bookmarks } = state;

  try {
    store.set('favorites', favorites);
    store.set('bookmarks', bookmarks);
  } catch (err) {}
};
