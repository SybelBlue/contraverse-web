# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :contra,
  ecto_repos: [Contra.Repo]

# Configures the endpoint
config :contra, ContraWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "42IHIwyRkvEEHtkKXo/bC42zNOzaoT1035yVionxudj/TbeiEeHSb/7PFncCpTfY",
  render_errors: [view: ContraWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Contra.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
