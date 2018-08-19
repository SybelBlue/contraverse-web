use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :contra, ContraWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :contra, Contra.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "_Beware-18-theIdesofMarch!",
  database: "contra_dev",
  hostname: "localhost",
  pool_size: 10
