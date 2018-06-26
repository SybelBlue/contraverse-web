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

    get "/", PageController, :index
    get "/home", HomeController, :index
    get "/new", NewController, :index #I can't think of a better name for the new-user screen
    resources "/registrations", UserController, only: [:create, :new]

    get "/login", SessionController, :new
    post "/login", SessionController, :create
    delete "/logout", SessionController, :delete

  end

  # Other scopes may use custom stacks.
  # scope "/api", ContraWeb do
  #   pipe_through :api
  # end
end
