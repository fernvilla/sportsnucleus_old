const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    tweetId: {
      type: String,
      required: true,
      unique: true
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
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true
    },
    profileImage: String
  },
  {
    timestamps: true
  }
);

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
