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
  .route('/:team_id')
  .get((req, res) => {
    Team.findById(req.params.team_id)
      .populate('twitterAccounts')
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

module.exports = router;
