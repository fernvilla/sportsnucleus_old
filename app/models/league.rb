class League < ApplicationRecord
  has_many :teams, -> { order(:short_name => :desc) }

  validates :name, :canonical, :website, :short_name, presence: true
end
