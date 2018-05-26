class TweetsController < ApplicationController
  before_action :set_tweet, only: [:show, :update, :destroy]

  def index
    @tweets = Tweet.all.order("published DESC")

    render json: @tweets, include: :team
  end

  def paginated
    @tweets = Tweet.order('published DESC').page(params[:page])

    render json: {
      tweets: @tweets,
      # Necessary meta data to make the PaginatorSection component work
      meta: {
        current_page: @tweets.current_page,
        next_page: @tweets.next_page,
        prev_page: @tweets.prev_page,
        total_pages: @tweets.total_pages,
        total_count: @tweets.total_count,
        last_page: @tweets.last_page?  
      }
    }, include: :team
  end

  def show
    render json: @tweet
  end

  def create
    @tweet = Tweet.new(tweet_params)

    if @tweet.save
      render json: @tweet, status: :created, location: @tweet
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  def update
    if @tweet.update(tweet_params)
      render json: @tweet
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tweet.destroy
  end

  private
    def set_tweet
      @tweet = Tweet.find(params[:id])
    end

    def tweet_params
      params.require(:tweet).permit(:text, :tweet_id, :published, :twitter_account_id, :screen_name, :name, :profile_image_url, :image_url)
    end
end
