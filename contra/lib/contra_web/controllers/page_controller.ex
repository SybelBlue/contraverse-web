defmodule ContraWeb.PageController do
  use ContraWeb, :controller

  def index(conn, _params) do
    # TODO if user is not logged in, redirect to login.
    # for now, redirecting to /login always
    redirect conn, to: "/login"
    # render conn, "index.html"
  end
end
