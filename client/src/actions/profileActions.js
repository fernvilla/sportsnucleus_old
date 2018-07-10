import axios from 'axios';
import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from './types';

export const addFavorite = favorite => dispatch => {
  axios
    .post('/api/profile/favorites', { favorite })
    .then(() => dispatch(getCurrentProfile()))
    .catch(err => console.error(err));
};

export const removeFavorite = favorite => dispatch => {
  axios
    .delete(`/api/profile/favorites/${favorite}`)
    .then(() => dispatch(getCurrentProfile()))
    .catch(err => console.error(err));
};

export const getCurrentProfile = () => dispatch => {
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
