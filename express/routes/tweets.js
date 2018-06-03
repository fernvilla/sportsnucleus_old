const express = require('express');
const router = express.Router();
const Tweet = require('./../models/tweet');
const TwitterAccount = require('./../models/twitterAccount');
const moment = require('moment');
const start = moment.subtract(24, 'hours').toDate();

router.route('/').get((req, res) => {
  Tweet.find({})
    .lean()
    .sort({ published: 'desc' })
    .exec((err, tweets) => {
      if (err) {
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets.'
        });
      }

      res.status(200).json({ payload: tweets });
    });
});

router.get('/last_day', (req, res) => {
  Tweet.find({})
    .lean()
    .populate('team', 'name slug')
    .where('published')
    .gte(start)
    .sort({ published: 'desc' })
    .exec((err, tweets) => {
      if (err)
        return res.status(500).json({
          error: err,
          message: 'There was an error retrieving tweets'
        });

      res.status(200).json({ payload: tweets });
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

        res.status(200).json({ message: 'Tweet deleted!' });
      }
    );
  });
});

module.exports = router;
