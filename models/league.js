const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true,
    unique: true
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
});

const League = mongoose.model('League', LeagueSchema);

module.exports = League;
