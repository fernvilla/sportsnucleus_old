require('dotenv').config();

const TwitterAccount = require('./../models/TwitterAccount');
const Team = require('./../models/Team');
const Tweet = require('./../models/Tweet');
const Twit = require('twit');
const mongoose = require('mongoose');

require('./../config/database.js');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
  timeout_ms: 60 * 1000
});

mongoose.connection.on('connected', () => initParser());

const disconnectDb = () => mongoose.disconnect();

let totalAccounts = 0;
let processedAccounts = 0;

const initParser = () => {
  TwitterAccount.find({}).exec((err, twitterAccounts) => {
    if (err || !twitterAccounts.length) return disconnectDb();

    totalAccounts = twitterAccounts.length;

    twitterAccounts.map(twitterAccount => processTweets(twitterAccount));
  });
};

const checkForDisconnect = () => {
  processedAccounts++;

  if (processedAccounts === totalAccounts) {
    disconnectDb();
  }
};

const processTweets = twitterAccount => {
  const { screenName, team, _id } = twitterAccount;
  let totalTweets = 0;
  let processedTweets = 0;

  const checkAllTweetsProcessed = () => {
    processedTweets++;

    if (processedTweets === totalTweets) {
      checkForDisconnect();
    }
  };

  T.get(
    'statuses/user_timeline',
    {
      screen_name: screenName,
      include_rts: true,
      exclude_replies: true
    },
    (err, data, response) => {
      if (err || !data.length) return checkForDisconnect();

      totalTweets = data.length;

      data.map(d => {
        const media = d.entities.media;
        const image = media ? media[0].media_url_https : null;

        const tweet = new Tweet({
          text: d.text,
          tweetId: d.id_str,
          published: d.created_at,
          userName: d.user.name,
          profileImageUrl: d.user.profile_image_url,
          imageUrl: image,
          twitterAccount: _id
        });

        Team.findById(team, (err, team) => {
          if (err) {
            checkAllTweetsProcessed();
            return console.log(`find twitter account error: ${err}`);
          }

          tweet.team = team._id;

          tweet.save((err, tweet) => {
            if (err) {
              checkAllTweetsProcessed();

              return console.log(`tweet save error: ${err}`);
            }

            team.tweets.push(tweet);

            team.save(err => {
              if (err) {
                checkAllTweetsProcessed();

                return console.log(`team save error: ${err}`);
              }

              checkAllTweetsProcessed();
            });
          });
        });
      });
    }
  );
};
