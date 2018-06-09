const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('./../../validation/register');
const validateLoginInput = require('./../../validation/login');

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';

        return res.status(400).json({ errors });
      }

      const {
        body: { email, password }
      } = req;

      const newUser = new User({
        email: email.toLowerCase(),

        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err =>
              res
                .status(500)
                .json({ error: err, message: 'There was an error saving your account.' })
            );
        });
      });
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        message: 'There was a problem registering your account.'
      })
    );
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';

        return res.status(404).json({ errors });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const { id, isAdmin } = user;
          const payload = { id, isAdmin };

          jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              return res.status(500).json({ error: err, message: 'Login failed' });
            }

            res.json({ payload: `Bearer ${token}` });
          });
        } else {
          errors.password = 'Password incorrect';

          return res.status(400).json({ errors });
        }
      });
    })
    .catch(err =>
      res.status(500).json({
        error: err,
        message: 'There was a problem retrieving your account.'
      })
    );
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, email, isAdmin, date } = req.user;
  res.json({
    payload: { id, email, isAdmin, date }
  });
});

module.exports = router;
