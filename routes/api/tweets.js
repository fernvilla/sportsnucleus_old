const express = require('express');
const router = express.Router();
const Tweet = require('./../../models/Tweet');
const TwitterAccount = require('./../../models/TwitterAccount');
const moment = require('moment');
const start = moment()
  .subtract(24, 'hours')
  .toDate();

router.route('/').get((req, res) => {
  Tweet.find({})
    .lean()
    .populate('twitterAccount', 'screenName')
    .populate('team', 'name slug')
    .sort({ published: 'desc' })
    .exec((err, tweets) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets.'
        });
      }

      res.json(tweets);
    });
});

router.route('/teams').post((req, res) => {
  Tweet.find({})
    .lean()
    .populate('twitterAccount', 'screenName')
    .populate('team', 'name slug')
    .sort({ published: 'desc' })
    .exec((err, tweets) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets.'
        });
      }
      const { teams } = req.body;

      if (!teams || !teams.length) return res.json([]);

      let newTweets = [];

      teams.map(team => {
        const filtered = tweets.filter(t => t.team.slug === team);

        return (newTweets = [...newTweets, ...filtered]);
      });

      newTweets.sort((a, b) => new Date(b.published) - new Date(a.published));

      res.json(newTweets);
    });
});

router.route('/teams/last_day').post((req, res) => {
  Tweet.find({})
    .lean()
    .populate('twitterAccount', 'screenName')
    .populate('team', 'name slug')
    .sort({ published: 'desc' })
    .where('published')
    .gte(start)
    .exec((err, tweets) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets.'
        });
      }
      const { teams } = req.body;

      if (!teams || !teams.length) return res.json([]);

      let newTweets = [];

      teams.map(team => {
        const filtered = tweets.filter(t => t.team.slug === team);

        return (newTweets = [...newTweets, ...filtered]);
      });

      newTweets.sort((a, b) => new Date(b.published) - new Date(a.published));

      res.json(newTweets);
    });
});

router.get('/last_day', (req, res) => {
  Tweet.find({})
    .lean()
    .populate('twitterAccount', 'screenName')
    .populate('team', 'name slug')
    .where('published')
    .gte(start)
    .sort({ published: 'desc' })
    .exec((err, tweets) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets'
        });
      }

      res.json(tweets);
    });
});

router.route('/:tweet_id').delete((req, res) => {
  Tweet.findByIdAndRemove(req.params.tweet_id, (err, tweet) => {
    if (err)
      return res.status(400).json({
        error: err,
        message: 'There was an error deleting tweet.'
      });

    //Pull tweet from twitter account
    TwitterAccount.findByIdAndUpdate(
      tweet.twitterAccount._id,
      { $pull: { tweets: tweet._id } },
      err => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error deleting tweet from twitter account.'
          });
        }

        res.json({ message: 'Tweet deleted!' });
      }
    );
  });
});

module.exports = router;
