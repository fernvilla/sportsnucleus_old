const express = require('express');
const router = express.Router();
const League = require('./../../models/League');
const validateLeagueInput = require('./../../validation/league');

router
  .route('/')
  .get((req, res) => {
    League.find({})
      .lean()
      .populate('teams', 'slug shortName name')
      .sort({ name: 'desc' })
      .exec((err, leagues) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: 'There was an error retrieving leagues.'
          });
        }

        res.json(leagues);
      });
  })
  .post((req, res) => {
    const { errors, isValid } = validateLeagueInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    League.findOne({ name: req.body.name })
      .then(league => {
        if (league) {
          errors.name = 'Name already exists';

          return res.status(400).json(errors);
        }

        const {
          body: { name, slug, website, shortName, isAdmin }
        } = req;

        if (isAdmin) {
          return res.status(400).json(errors);
        }

        const newLeague = new League({
          name,
          slug,
          website,
          shortName
        });

        newLeague.save((err, league) => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: 'There was an error creating league.'
            });
          }

          res.json({
            message: 'League created!',
            payload: league
          });
        });
      })
      .catch(err =>
        res.status(500).json({
          error: err,
          message: 'There was a problem creating a league.'
        })
      );
  });

router
  .route('/:league_id')
  .get((req, res) => {
    League.findById(req.params.league_id)
      .populate('teams', 'slug shortName name')
      .exec((err, league) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: 'There was an error retrieving league.'
          });
        }

        res.json(league);
      });
  })
  .put((req, res) => {
    League.findByIdAndUpdate(req.params.league_id, req.body, { new: true }, (err, league) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: 'There was an error updating league.'
        });
      }

      res.json({
        message: 'League updated!',
        payload: league
      });
    });
  })
  .delete((req, res) => {
    League.findByIdAndRemove(req.params.league_id, (err, league) => {
      if (err)
        return res.status(400).json({
          error: err,
          message: 'There was an error deleting league.'
        });

      res.json({ message: 'League deleted!' });
    });
  });

module.exports = router;
