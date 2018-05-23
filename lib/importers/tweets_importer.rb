require 'dotenv/load' if (ENV['RUBY_ENV'] == "development" || ENV['RUBY_ENV'] == "test")
require 'pp'

class TweetsImporter
  def self.import
    client = Twitter::REST::Client.new do |config|
      config.consumer_key = URI.parse(ENV['TWITTER_CONSUMER_KEY'])
      config.consumer_secret = URI.parse(ENV['TWITTER_CONSUMER_SECRET'])
      config.access_token = URI.parse(ENV['TWITTER_ACCESS_TOKEN'])
      config.access_token_secret = URI.parse(ENV['TWITTER_ACCESS_SECRET'])
    end

    users = TwitterAccount.all.to_a

    users.each do |user|
      begin
        data = client.user_timeline({
          screen_name: user.screen_name,
          count: 15,
          include_rts: true,
          exclude_replies: true,
        })

        data = data.to_a

        next unless defined? data

        data.each do |d|
          next unless (Date.today - d.created_at.to_date).to_i <= 2

          tweet_id = d.to_h[:id_str]
          media = d.to_h[:entities][:media]
          image = media ? media.first[:media_url_https] : nil

          Tweet.where(tweet_id: tweet_id).first_or_create(
            text: d.text,
            tweet_id: tweet_id,
            published: d.created_at,
            screen_name: d.user.screen_name,
            name: d.user.name,
            profile_image_url: d.user.profile_image_url_https,
            twitter_account_id: user.id,
            image_url: image,
          )
        end
      rescue => e
        # log exception or ignore it.
        pp e
      end
    end
  end
end
