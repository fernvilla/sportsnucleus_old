import axios from 'axios';

import { FETCHING_TWEETS, FETCH_TWEETS_ERROR, FETCH_TWEETS_SUCCESS } from './types';

export const fetchingTweets = bool => ({
  type: FETCHING_TWEETS,
  isFetching: bool
});

export const fetchTweetsError = bool => ({
  type: FETCH_TWEETS_ERROR,
  hasErrored: bool
});

export const fetchTweetsSuccess = tweets => ({
  type: FETCH_TWEETS_SUCCESS,
  tweets
});

export const fetchTweets = () => dispatch => {
  dispatch(fetchingTweets(true));

  axios
    .get('/api/tweets/teams')
    .then(({ data }) => {
      dispatch(fetchTweetsSuccess(data));
      dispatch(fetchingTweets(false));
    })
    .catch(err => {
      dispatch(fetchingTweets(false));
      dispatch(fetchTweetsError(true));
    });
};

export const fetchTweetsByTeams = teams => dispatch => {
  dispatch(fetchingTweets(true));

  axios
    .post(`/api/tweets/teams`, { teams })
    .then(({ data }) => {
      dispatch(fetchTweetsSuccess(data));
      dispatch(fetchingTweets(false));
    })
    .catch(err => {
      dispatch(fetchingTweets(false));
      dispatch(fetchTweetsError(true));
    });
};
