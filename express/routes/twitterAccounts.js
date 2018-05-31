var express = require('express');
var router = express.Router();
var TwitterAccount = require('./../models/TwitterAccount');

router.get('/', (req, res) => {
  TwitterAccount.find({})
    .lean()
    .populate('team')
    .exec((err, accounts) => {
      if (err) return res.json(err);

      res.json(accounts);
    });
});

module.exports = router;
