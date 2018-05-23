class Team < ApplicationRecord
  belongs_to :league
  has_namy :twitter_accounts

  validates :name, :short_name, :website, :canonical, presence: true
end
