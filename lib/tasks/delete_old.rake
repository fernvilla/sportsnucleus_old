# lib/tasks/delete_old_records.rake
namespace :delete do
  desc 'Delete records older than 7 days'

  # task :old_articles => :environment do
  #   Article.delete_all("created_at < '#{7.days.ago}'")
  # end

  task :old_tweets => :environment do
    Tweet.delete_all("created_at < '#{7.days.ago}'")
  end

  desc "Delete all"
  task :all => [:old_tweets, :old_articles]
end
