const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const TweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  tweetId: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  screenName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  profileImage: String
});

TweetSchema.pre('save', function(next) {
  const self = this;
  const today = moment().startOf('day');
  const daysFromToday = today.diff(self.published, 'days');

  if (daysFromToday <= 2) {
    Tweet.find({ tweetId: self.tweetId }, function(err, docs) {
      if (!docs.length) {
        next();
      }
    });
  }
});

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
