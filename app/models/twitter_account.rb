class TwitterAccount < ApplicationRecord
  belongs_to :team
  has_many :tweets

  validates :team_id, :screen_name, :account_type, presence: true
end
