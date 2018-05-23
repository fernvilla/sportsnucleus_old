# require File.expand_path("../importers/articles_importer.rb", File.dirname(__FILE__))
require File.expand_path("../importers/tweets_importer.rb", File.dirname(__FILE__))

namespace :fetch do
  # desc "Fetch new articles"
  # task :articles => :environment do
  #   original_count = Article.count

  #   ArticlesImporter.import

  #   newly_added = Article.count - original_count
  #   puts "There are now #{Article.count} articles. #{newly_added} were just added."
  # end

  desc "Fetch new tweets"
  task :tweets => :environment do
    original_count = Tweet.count

    TweetsImporter.import

    newly_added = Tweet.count - original_count
    puts "There are now #{Tweet.count} tweets. #{newly_added} were just added."
  end

  desc "Fetch all"
  task :all => [:tweets, :articles]
end
