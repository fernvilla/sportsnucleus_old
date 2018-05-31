const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
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
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
    required: true
  },
  twitterAccounts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TwitterAccount',
      required: true
    }
  ]
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
