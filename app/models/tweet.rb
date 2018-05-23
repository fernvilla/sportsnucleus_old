class Tweet < ApplicationRecord
  belongs_to :twitter_account

  validates :twitter_account, :text, :tweet_id, :published, :screen_name, :name, presence: true
end
