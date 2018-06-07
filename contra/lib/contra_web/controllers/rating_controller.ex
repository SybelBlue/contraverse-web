defmodule ContraWeb.RatingController do
  use ContraWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def rate(conn, %{"rating" => rating}) do
    # text(conn, "Rating: " <> rating)
    # :timer.sleep(1000)
    redirect conn, to: page_path conn, :index
  end
end
