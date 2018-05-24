class CreateTweets < ActiveRecord::Migration[5.2]
  def change
    create_table :tweets do |t|
      t.text :text
      t.string :tweet_id
      t.datetime :published
      t.references :team, foreign_key: true
      t.string :screen_name
      t.string :name
      t.string :profile_image_url
      t.string :image_url

      t.timestamps
    end
  end
end
