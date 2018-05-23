class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :canonical
      t.string :website
      t.string :short_name
      t.references :league, foreign_key: true

      t.timestamps
    end
  end
end
