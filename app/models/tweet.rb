class Tweet < ApplicationRecord
  belongs_to :team

  validates :team, :text, :tweet_id, :published, :screen_name, :name, presence: true
end
