import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, REGISTERING_USER, LOGGING_IN_USER } from './types';

export const registeringUser = bool => ({
  type: REGISTERING_USER,
  isRegistering: bool
});

export const loggingInUser = bool => ({
  type: LOGGING_IN_USER,
  isLoggingIn: bool
});

export const registerUser = (userData, history) => dispatch => {
  dispatch(registeringUser(true));

  axios
    .post('/api/users/register', userData)
    .then(res => {
      dispatch(registeringUser(false));

      history.push('/login');
    })
    .catch(err => {
      dispatch(registeringUser(false));

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  dispatch(loggingInUser(true));

  axios
    .post('/api/users/login', userData)
    .then(res => {
      dispatch(loggingInUser(false));

      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt_decode(token)));
    })
    .catch(err => {
      dispatch(loggingInUser(false));

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
