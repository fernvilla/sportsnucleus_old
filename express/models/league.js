const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  canonical: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    }
  ]
});

const League = mongoose.model('League', LeagueSchema);

module.exports = League;
