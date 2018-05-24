class TwitterAccount < ApplicationRecord
  belongs_to :team

  validates :team_id, :screen_name, :account_type, presence: true
end
