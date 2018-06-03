const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TwitterAccountSchema = new Schema({
  screenName: {
    type: String,
    required: true,
    unique: true
  },
  accountType: {
    required: { type: String, enum: ['team', 'player', 'media'] }
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet'
    }
  ]
});

const TwitterAccount = mongoose.model('TwitterAccount', TwitterAccountSchema);

module.exports = TwitterAccount;
