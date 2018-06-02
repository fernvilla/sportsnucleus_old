require('dotenv').config();

const database = require('./../connection');
const mongoose = require('mongoose');
const Tweet = require('./../models/tweet');
const Team = require('./../models/team');

const Twit = require('twit');
const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  app_only_auth: true,
  timeout_ms: 60 * 1000
});

const fetchTweets = (team, screenName) => {
  T.get(
    'statuses/user_timeline',
    {
      screen_name: screenName,
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
          screenName: d.user.screen_name,
          userName: d.user.name,
          profileImage: d.user.profile_image_url
        });

        Team.findOne({ canonical: team }, (err, team) => {
          if (err) return console.log(err);

          tweet.team = team._id;

          tweet.save((err, tweet) => {
            if (err) return console.log(err);

            team.tweets.push(tweet);

            team.save((err, team) => {
              if (err) return console.log(err);

              console.log('Tweet created: ', tweet);
            });
          });
        });
      });
    }
  );
};

mongoose.connection.on('connected', () => {
  users.map(u => {
    return u.screenNames.map(name => {
      return fetchTweets(u.team, name);
    });
  });

  setTimeout(function() {
    mongoose.disconnect();
  }, 10000);
});
