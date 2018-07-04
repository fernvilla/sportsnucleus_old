const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('./../../models/Profile');
// const User = require('./../../models/User');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req);
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';

        return res.status(404).json({ errors });
      }

      res.json({ payload: profile });
    })
    .catch(err => res.status(404).json({ error: err }));
});

module.exports = router;
