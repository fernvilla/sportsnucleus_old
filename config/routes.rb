Rails.application.routes.draw do
  scope "/api" do
    resources :tweets do
      collection do
        get 'paginated_tweets'
      end
    end

    resources :twitter_accounts
    resources :teams
    resources :leagues
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "*path", to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
