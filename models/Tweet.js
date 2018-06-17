const mongoose = require('mongoose');
const { uploadToS3 } = require('./../utils/s3');

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
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    imageUrl: String,
    profileImageUrl: String
  },
  {
    timestamps: true
  }
);

TweetSchema.pre('save', function(next) {
  const self = this;

  Tweet.find({ tweetId: self.tweetId }, (err, docs) => {
    if (!docs.length) {
      if (self.imageUrl) {
        const imagePath = `${self.tweetId}.${self.imageUrl.split('.').pop()}`;

        //Save here to prevent multiple uploads when tweet already exists
        uploadToS3(self.imageUrl, 'tweets', imagePath)
          .then(path => {
            self.imageUrl = path;

            next();
          })
          .catch(() => next());
      } else {
        next();
      }
    } else {
      next(new Error('Tweet exists!'));
    }
  });
});

module.exports = Tweet = mongoose.model('Tweet', TweetSchema);
