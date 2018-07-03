const express = require('express');
const router = express.Router();
const Tweet = require('./../../models/Tweet');
const TwitterAccount = require('./../../models/TwitterAccount');

// Get all tweets
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

// Get all w/pagination
router.post('/paginated', (req, res) => {
  const { currentPage, recordsPerPage } = req.body;

  Tweet.find()
    .lean()
    .populate('twitterAccount', 'screenName')
    .populate('team', 'name slug')
    .sort({ published: -1 })
    .limit(recordsPerPage)
    .skip((currentPage - 1) * recordsPerPage)
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

// Get all tweets for specified teams w/pagination
router.route('/teams/paginated').post((req, res) => {
  const { currentPage, recordsPerPage, teams } = req.body;

  Tweet.aggregate()
    .lookup({
      from: 'teams',
      localField: 'team',
      foreignField: '_id',
      as: 'team'
    })
    .unwind('$team')
    .match({ 'team.slug': { $in: teams } })
    .lookup({
      from: 'twitteraccounts',
      localField: 'twitterAccount',
      foreignField: '_id',
      as: 'twitterAccount'
    })
    .unwind('twitterAccount')
    .limit(recordsPerPage)
    .skip((currentPage - 1) * recordsPerPage)
    .project({
      tweetId: 1,
      text: 1,
      profileImageUrl: 1,
      created: 1,
      published: 1,
      imageUrl: 1,
      'team.slug': 1,
      'team.name': 1,
      'twitterAccount.screenName': 1
    })
    .sort({ published: -1 })
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
