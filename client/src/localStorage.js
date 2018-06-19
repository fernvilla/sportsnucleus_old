import store from 'store';

export const loadState = () => {
  try {
    return {
      favorites: store.get('favorites')
    };
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = state => {
  const { favorites } = state;

  try {
    store.set('favorites', favorites);
  } catch (err) {}
};
