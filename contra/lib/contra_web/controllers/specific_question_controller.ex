defmodule ContraWeb.SpecificQuestionController do
  use ContraWeb, :controller

  @doc """
  Accepts the category and topic from the params url map and
  renders it
  The params entries are availiable in html via @category, @topic
  """
  def show(conn, %{"category" => category, "topic" => topic}) do
    conn
    |> assign(:category, category)
    |> assign(:topic, topic)
    |> render("index.html")
  end
end
