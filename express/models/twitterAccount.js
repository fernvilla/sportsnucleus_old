const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TwitterAccountSchema = new Schema({
  screenName: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

const TwitterAccount = mongoose.model('TwitterAccount', TwitterAccountSchema);

module.exports = TwitterAccount;
