const express = require('express');
const router = express.Router();
const League = require('./../../models/League');

router
  .route('/')
  .get((req, res) => {
    League.find({})
      .lean()
      .populate({
        path: 'teams',
        select: 'slug shortName name',
        match: null,
        options: { sort: { name: 'asc' } }
      })
      .sort({ name: 'asc' })
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
    League.findOne({ name: req.body.name })
      .then(league => {
        if (league) {
          return res.status(400).json({ error: 'Name already exists' });
        }

        const {
          body: { name, slug, website, shortName, isAdmin }
        } = req;

        if (isAdmin) {
          return res.status(400).json({ error: 'Not Authorized' });
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
  .route('/:slug')
  .get((req, res) => {
    League.findOne({ slug: req.params.slug }).exec((err, league) => {
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
