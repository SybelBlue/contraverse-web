defmodule ContraWeb.Router do
  use ContraWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ContraWeb do
    pipe_through :browser # Use the default browser stack

    ## NOTE: each time a specific page is created, its
    # extention must be added to the list of exceptions
    # in the top of the socket.js file

    get "/", PageController, :index
    get "/home", HomeController, :index
    get "/new-user", NewController, :index #I can't think of a better name for the new-user screen
    resources "/registrations", UserController, only: [:create, :new]
    get "/registrations/terms", UserController, :terms

    get "/login", SessionController, :new
    post "/login", SessionController, :create
    delete "/logout", SessionController, :delete

    # for testing purposes only
    get "/test", TestController, :show
    # passes URLs of the format .com/test/<val> into TestController.jimmy/2
    get "/test/:body", TestController, :jimmy

    # passes all items formatted ...com/<str> to ConvoSetupController,
    # so long as <str> is not "test", including the /new-convo page
    get "/:category", ConvoSetupController, :show
    # passes items formatted ...com/<str>/<str> to SpecQuesController
    get "/:category/:topic", SpecificQuestionController, :show
    # passes items formatted ...com/<str>/<str>/<str> to ChatController
    get "/:category/:topic/:chat_id", ChatController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", ContraWeb do
  #   pipe_through :api
  # end
end
