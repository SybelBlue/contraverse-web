defmodule ContraWeb.ConvoSetupController do
  use ContraWeb, :controller

  @doc """
  Accepts the category from the params url map and renders it
  The params entries are availiable in html via @category
  """
  def show(conn, %{"category" => category}) do
    conn
    |> assign(:category, category)
    |> render("index.html")
  end
end
