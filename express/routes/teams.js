var express = require('express');
var router = express.Router();
var Team = require('./../models/Team');

router.get('/', (req, res) => {
  Team.find({})
    .lean()
    .populate('league')
    .exec((err, teams) => {
      if (err) return res.json(err);

      res.json(teams);
    });
});

module.exports = router;
