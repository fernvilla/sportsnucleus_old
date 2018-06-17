const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TwitterAccountSchema = new Schema({
  screenName: {
    type: String,
    required: true,
    unique: true
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

module.exports = TwitterAccount = mongoose.model('TwitterAccount', TwitterAccountSchema);
