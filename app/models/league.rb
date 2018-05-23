class League < ApplicationRecord
  has_many :teams

  validates :name, :canonical, :website, :short_name, presence: true
end
