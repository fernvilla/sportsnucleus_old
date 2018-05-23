# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_22_070257) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "leagues", force: :cascade do |t|
    t.string "name"
    t.string "canonical"
    t.string "website"
    t.string "short_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "canonical"
    t.string "website"
    t.string "short_name"
    t.bigint "league_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_teams_on_league_id"
  end

  create_table "tweets", force: :cascade do |t|
    t.text "text"
    t.string "tweet_id"
    t.datetime "published"
    t.bigint "twitter_account_id"
    t.string "screen_name"
    t.string "name"
    t.string "profile_image_url"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["twitter_account_id"], name: "index_tweets_on_twitter_account_id"
  end

  create_table "twitter_accounts", force: :cascade do |t|
    t.string "screen_name"
    t.string "account_type"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_twitter_accounts_on_team_id"
  end

  add_foreign_key "teams", "leagues"
  add_foreign_key "tweets", "twitter_accounts"
  add_foreign_key "twitter_accounts", "teams"
end
