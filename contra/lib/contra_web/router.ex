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

    get "/", HomeController, :index
    #this directs all items matching .../test to TestController.index
    get "/test", TestController, :index
    #/:body passes what val matches as a map %{"body" => val} to TestController.jimmy
    get "/test/:body", TestController, :jimmy

    # passes all items formatted ...com/<str> to ConvoSetupController
    # including the /new-convo page
    get "/:category", ConvoSetupController, :show
    # passes items formatted ...com/<str>/<str> to SpecQuesController
    get "/:category/:topic", SpecificQuestionController, :show
    # passes items formatted ...com/<str>/<str>/<str> to ChatController
    get "/:category/:topic/:chat", ChatController, :show
  end

  # Other scopes may use custom stacks.
  # scope "/api", ContraWeb do
  #   pipe_through :api
  # end
end
