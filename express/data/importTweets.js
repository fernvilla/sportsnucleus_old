require('dotenv').config();

const TwitterAccount = require('./../models/twitterAccount');
const Tweet = require('./../models/tweet');
const Twit = require('twit');
const database = require('./../config/database.js');
const mongoose = require('mongoose');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
  timeout_ms: 60 * 1000
});

mongoose.connection.on('connected', () => {
  initParser();
});

const disconnectDb = () => {
  mongoose.disconnect();
};

const initParser = () => {
  TwitterAccount.find({}).exec((err, twitterAccounts) => {
    if (!twitterAccounts.length) return disconnectDb();

    if (err) return disconnectDb();

    twitterAccounts.map(twitterAccount => fetchTweets(twitterAccount));
  });

  //TODO: find better way of disconnecting
  setTimeout(() => {
    disconnectDb();
  }, 30000);
};

const fetchTweets = twitterAccount => {
  T.get(
    'statuses/user_timeline',
    {
      screen_name: twitterAccount.screenName,
      count: 30,
      include_rts: true,
      exclude_replies: true
    },
    (err, data, response) => {
      if (err) return console.log(err);

      return data.map(d => {
        const tweet = new Tweet({
          text: d.text,
          tweetId: d.id_str,
          published: d.created_at,
          userName: d.user.name,
          profileImageUrl: d.user.profile_image_url,
          twitterAccount: twitterAccount._id
        });

        tweet.save((err, tweet) => {
          if (err) return console.log(err);

          twitterAccount.tweets.push(tweet);

          twitterAccount.save((err, twitterAccount) => {
            if (err) return console.log(err);

            console.log('Tweet created: ', tweet);
          });
        });
      });
    }
  );
};
