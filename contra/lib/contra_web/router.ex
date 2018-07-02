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

    # this directs to the home page
    get "/", HomeController, :index

    ## NOTE: adding specific pages is done here,
    # however, to prevent them being processed as
    # categories by app.js and socket.js, it must
    # also be added to the exceptions list in
    # socket.js

    # this directs to the login page
    get "/login", LoginController, :index

    #this directs all items matching .../test to TestController.index
    get "/test", TestController, :index
    #/:body passes what val matches as a map %{"body" => val} to TestController.jimmy
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
