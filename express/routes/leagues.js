var express = require('express');
var router = express.Router();
var League = require('./../models/league');

router.get('/', (req, res) => {
  League.find({})
    .lean()
    .populate('teams')
    .exec((err, leagues) => {
      if (err) return res.json(err);

      res.json(leagues);
    });
});

module.exports = router;
