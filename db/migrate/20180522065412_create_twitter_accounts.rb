class CreateTwitterAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :twitter_accounts do |t|
      t.string :screen_name
      t.string :account_type
      t.references :team, foreign_key: true

      t.timestamps
    end
  end
end
