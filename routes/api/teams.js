const express = require('express');
const router = express.Router();
const Team = require('./../../models/Team');
const League = require('./../../models/League');

router
  .route('/')
  .get((req, res) => {
    Team.find({})
      .lean()
      .populate('league', 'shortName')
      .sort({ name: 'desc' })
      .exec((err, teams) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: 'There was an error retrieving teams.'
          });
        }

        res.json(teams);
      });
  })
  .post((req, res) => {
    const {
      body: { name, slug, website, shortName, league }
    } = req;

    const newTeam = new Team({
      name,
      slug,
      website,
      shortName
    });

    //Find league to attach to team
    League.findById(league).exec((err, league) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: 'There was an error finding a league.'
        });
      }

      newTeam.league = league._id;

      newTeam.save((err, team) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error creating a team.'
          });
        }

        //Add team to league
        league.teams.push(team);

        league.save((err, league) => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: 'There was an error saving league with new team.'
            });
          }

          res.json(team);
        });
      });
    });
  });

router
  .route('/:slug')
  .get((req, res) => {
    Team.findOne({ slug: req.params.slug })
      .populate({
        path: 'tweets',
        options: { sort: { published: -1 } },
        populate: {
          path: 'twitterAccount',
          model: 'TwitterAccount',
          select: 'screenName'
        }
      })
      .exec((err, team) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error retrieving team.'
          });
        }

        res.json(team);
      });
  })
  .put((req, res) => {
    Team.findByIdAndUpdate(req.params.team_id, req.body, { new: true }, (err, team) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: 'There was an error updating team.'
        });
      }

      res.json(team);
    });
  })
  .delete((req, res) => {
    Team.findByIdAndRemove(req.params.team_id, (err, team) => {
      if (err)
        return res.status(400).json({
          error: err,
          message: 'There was an error deleting team.'
        });

      //Pull team from league
      League.findByIdAndUpdate(team.league._id, { $pull: { teams: team._id } }, err => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error deleting team from league.'
          });
        }

        res.json({ message: 'Team deleted!' });
      });
    });
  });

router //Get all teams without referenced documents
  .get('/basic', (req, res) => {
    Team.find({}, { tweets: 0 })
      .lean()
      .sort({ name: 'asc' })
      .exec((err, teams) => {
        if (err) return res.json({ error: err });

        res.json(teams);
      });
  })
  //Get team tweets
  .get('/:team/tweets', (req, res) => {
    Team.findOne({ slug: req.params.team })
      .lean()
      .populate({
        path: 'tweets',
        options: {
          sort: { created: 'desc' }
        }
      })
      .exec((err, team) => {
        if (err) return res.json({ error: err });

        res.json({ payload: team.tweets });
      });
  });
module.exports = router;
