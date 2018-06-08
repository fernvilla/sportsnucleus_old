const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favoriteTeams: {
    type: [String]
  }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
