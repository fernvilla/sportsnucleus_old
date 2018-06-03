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
    twitterAccount: {
      type: Schema.Types.ObjectId,
      ref: 'TwitterAccount',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    profileImageUrl: String
  },
  {
    timestamps: true
  }
);

TweetSchema.pre('save', function(next) {
  const self = this;

  Tweet.find({ tweetId: self.tweetId }, (err, docs) => {
    if (!docs.length) next();
  });
});

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
