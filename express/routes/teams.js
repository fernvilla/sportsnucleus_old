const express = require('express');
const router = express.Router();
const Team = require('./../models/team');
const League = require('./../models/league');

router
  .route('/')
  .get((req, res) => {
    Team.find({})
      .lean()
      .sort({ name: 'desc' })
      .exec((err, teams) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: 'There was an error retrieving teams.'
          });
        }

        res.status(200).json({ payload: teams });
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
    League.findOne({ shortName: league }, (err, league) => {
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

          res.status(200).json({
            message: 'Team created!',
            payload: team
          });
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

        res.status(200).json({ payload: team });
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

      res.status(200).json({
        message: 'Team updated!',
        payload: team
      });
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

        res.status(200).json({ message: 'Team deleted!' });
      });
    });
  });

module.exports = router;
