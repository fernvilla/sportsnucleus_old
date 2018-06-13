const database = require('./../config/database');
const mongoose = require('mongoose');
const moment = require('moment');
const startDate = moment()
  .startOf('day')
  .toDate();
const endDat = moment(startDate)
  .subtract(1, 'weeks')
  .toDate();
const Tweet = require('./../models/Tweet');
const TwitterAccount = require('./../models/TwitterAccount');
const { deleteFromS3 } = require('./../utils/s3');

mongoose.connection.on('connected', () => getTweets());

const disconnectDb = () => mongoose.disconnect();

let totalTweets = 0;
let deleteCount = 0;

const getTweets = () => {
  Tweet.find({})
    .populate('team')
    .where('published')
    .lt(endDat)
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

      if (tweet.imageUrl) deleteFromS3(tweet.imageUrl);

      //Pull tweet from twitter account
      TwitterAccount.findByIdAndUpdate(
        tweet.twitterAccount._id,
        { $pull: { tweets: tweet._id } },
        err => {
          if (err) return checkForDisconnect();

          checkForDisconnect();
        }
      );
    });
  });
};

const checkForDisconnect = () => {
  deleteCount++;

  if (deleteCount === totalTweets) {
    disconnectDb();
  }
};
