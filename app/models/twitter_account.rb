class TwitterAccount < ApplicationRecord
  belongs_to :team
  has_many :tweets

  validates :team_id, :screen_name, :account_type, :user_id, presence: true
end
