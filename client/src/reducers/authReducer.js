import { SET_CURRENT_USER, LOGGING_IN_USER, REGISTERING_USER } from './../actions/types';
import isEmpty from './../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export const loggingInUser = (state = false, action) => {
  switch (action.type) {
    case LOGGING_IN_USER:
      return action.isLoggingIn;

    default:
      return state;
  }
};

export const registeringUser = (state = false, action) => {
  switch (action.type) {
    case REGISTERING_USER:
      return action.isRegistering;

    default:
      return state;
  }
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
