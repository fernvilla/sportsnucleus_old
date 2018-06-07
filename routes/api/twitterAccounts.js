const express = require('express');
const router = express.Router();
const TwitterAccount = require('./../../models/TwitterAccount');
const Team = require('./../../models/Team');

router
  .route('/')
  .get((req, res) => {
    TwitterAccount.find({})
      .lean()
      .exec((err, twitterAccounts) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: 'There was an error retrieving accounts.'
          });
        }

        res.json({ payload: twitterAccounts });
      });
  })
  .post((req, res) => {
    const {
      body: { screenName, accountType, team }
    } = req;

    const newTwitterAccount = new TwitterAccount({
      screenName,
      accountType
    });

    //Find team to attach to account
    Team.findOne({ shortName: team }, (err, team) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: 'There was an error finding a team.'
        });
      }

      newTwitterAccount.team = team._id;

      newTwitterAccount.save((err, twitterAccount) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error creating a twitter account.'
          });
        }

        //Add account to team
        team.twitterAccounts.push(twitterAccount);

        team.save((err, team) => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: 'There was an error saving team with new twitter account.'
            });
          }

          res.json({
            message: 'Twitter account created!',
            payload: twitterAccount
          });
        });
      });
    });
  });

router
  .route('/:twitter_account_id')
  .get((req, res) => {
    TwitterAccount.findById(req.params.twitter_account_id)
      .populate('tweets')
      .exec((err, twitterAccount) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error retrieving twitter account.'
          });
        }

        res.json({ payload: twitterAccount });
      });
  })
  .put((req, res) => {
    TwitterAccount.findByIdAndUpdate(
      req.params.twitter_account_id,
      req.body,
      { new: true },
      (err, twitterAccount) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error updating twitter account.'
          });
        }

        res.json({
          message: 'Twitter Account updated!',
          payload: twitterAccount
        });
      }
    );
  })
  .delete((req, res) => {
    TwitterAccount.findByIdAndRemove(req.params.twitter_account_id, (err, twitterAccount) => {
      if (err)
        return res.status(400).json({
          error: err,
          message: 'There was an error deleting account.'
        });

      //Pull account from team
      Team.findByIdAndUpdate(
        twitterAccount.team._id,
        { $pull: { twitterAccounts: twitterAccount._id } },
        err => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: 'There was an error deleting twitter account from team.'
            });
          }

          res.json({ message: 'Twitter Account deleted!' });
        }
      );
    });
  });

module.exports = router;
