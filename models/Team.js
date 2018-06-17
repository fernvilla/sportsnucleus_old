const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
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
      ref: 'TwitterAccount'
    }
  ],
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet'
    }
  ]
});

module.exports = Team = mongoose.model('Team', TeamSchema);
