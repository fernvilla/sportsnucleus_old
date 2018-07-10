import { GET_PROFILE, CLEAR_CURRENT_PROFILE } from './../actions/types';

const initialState = {
  favorites: []
};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;

    case CLEAR_CURRENT_PROFILE:
      return initialState;

    default:
      return state;
  }
};
