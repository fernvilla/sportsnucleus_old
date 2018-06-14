import { FETCH_TWEETS_ERROR, FETCHING_TWEETS, FETCH_TWEETS_SUCCESS } from './../actions/types';

export const fetchTweetsError = (state = false, action) => {
  switch (action.type) {
    case FETCH_TWEETS_ERROR:
      return action.hasErrored;

    default:
      return state;
  }
};

export const fetchingTweets = (state = true, action) => {
  switch (action.type) {
    case FETCHING_TWEETS:
      return action.isFetching;

    default:
      return state;
  }
};

export const tweets = (state = [], action) => {
  switch (action.type) {
    case FETCH_TWEETS_SUCCESS:
      return action.tweets;

    default:
      return state;
  }
};
