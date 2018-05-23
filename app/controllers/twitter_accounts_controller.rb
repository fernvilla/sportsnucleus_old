class TwitterAccountsController < ApplicationController
  before_action :set_twitter_account, only: [:show, :update, :destroy]

  # GET /twitter_accounts
  def index
    @twitter_accounts = TwitterAccount.all

    render json: @twitter_accounts
  end

  # GET /twitter_accounts/1
  def show
    render json: @twitter_account
  end

  # POST /twitter_accounts
  def create
    @twitter_account = TwitterAccount.new(twitter_account_params)

    if @twitter_account.save
      render json: @twitter_account, status: :created, location: @twitter_account
    else
      render json: @twitter_account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /twitter_accounts/1
  def update
    if @twitter_account.update(twitter_account_params)
      render json: @twitter_account
    else
      render json: @twitter_account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /twitter_accounts/1
  def destroy
    @twitter_account.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_twitter_account
      @twitter_account = TwitterAccount.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def twitter_account_params
      params.require(:twitter_account).permit(:screen_name, :account_type, :user_id, :team_id)
    end
end
