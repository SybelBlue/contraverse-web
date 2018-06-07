defmodule ContraWeb.PageController do
  use ContraWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

end
