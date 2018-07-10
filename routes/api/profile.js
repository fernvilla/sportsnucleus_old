const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('./../../models/Profile');
const User = require('./../../models/User');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';

        return res.status(404).json({ errors });
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({ error: err }));
});

router.post('/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndUpdate({ user: req.user.id }, req.body, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  })
    .then(profile => {
      const favorite = req.body.favorite;
      const exists = profile.favorites.map(item => item._id).indexOf(req.params.favorite) > -1;

      if (exists) return res.status(404).json('Favorite already exists');

      profile.favorites.push(favorite);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

router.delete(
  '/favorites/:favorite',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.favorites.map(item => item._id).indexOf(req.params.favorite);

        profile.favorites.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
