const express = require('express');
const router = express.Router();
const League = require('./../models/league');

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

        res.status(200).json({ payload: leagues });
      });
  })
  .post((req, res) => {
    const {
      body: { name, slug, website, shortName }
    } = req;

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

      res.status(200).json({
        message: 'League created!',
        payload: league
      });
    });
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

        res.status(200).json({ payload: league });
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

      res.status(200).json({
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

      res.status(200).json({ message: 'League deleted!' });
    });
  });

module.exports = router;
