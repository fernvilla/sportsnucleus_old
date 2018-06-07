const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const {
        body: { name, email, password }
      } = req;

      const newUser = new User({
        email: email.toLowerCase(),
        name,
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
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const { id, name, isAdmin } = user;
          const payload = { id, name, isAdmin };

          jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              return res.status(500).json({ error: err, message: 'Login failed' });
            }

            res.json({ payload: `Bearer ${token}` });
          });
        } else {
          return res.status(400).json({ message: 'Password incorrect' });
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
  const { id, email, name, isAdmin, date } = req.user;
  res.json({
    payload: { id, email, name, isAdmin, date }
  });
});

module.exports = router;
