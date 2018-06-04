const database = require('./../config/database');
const mongoose = require('mongoose');
const moment = require('moment');
const today = moment()
  .startOf('day')
  .toDate();
const twoWeeks = moment(today)
  .subtract(2, 'weeks')
  .toDate();
const Tweet = require('./../models/tweet');
const TwitterAccount = require('./../models/twitterAccount');

mongoose.connection.on('connected', () => getTweets());

const disconnectDb = () => mongoose.disconnect();

let totalTweets = 0;
let deleteCount = 0;

const getTweets = () => {
  Tweet.find({})
    .populate('team')
    .where('published')
    .lt(twoWeeks)
    .exec((err, tweets) => {
      if (err) return console.log(`Error fetching tweets: ${err}`);
      if (!tweets.length) return disconnectDb();

      totalTweets = tweets.length;
      deleteTweets(tweets);
    });
};

const deleteTweets = tweets => {
  tweets.map(tweet => {
    Tweet.findByIdAndRemove(tweet._id, (err, tweet) => {
      if (err) return checkForDisconnect();

      //Pull tweet from twitter account
      TwitterAccount.findByIdAndUpdate(
        tweet.twitterAccount._id,
        { $pull: { tweets: tweet._id } },
        err => {
          if (err) return checkForDisconnect();

          console.log(`Tweet deleted: ${tweet._id}`);
          checkForDisconnect();
        }
      );
    });
  });
};

const checkForDisconnect = () => {
  deleteCount++;

  console.log(deleteCount, totalTweets);

  if (deleteCount === totalTweets) {
    disconnectDb();
  }
};
