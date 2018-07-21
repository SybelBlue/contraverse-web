defmodule ContraWeb.SpecificQuestionController do
  use ContraWeb, :controller

  @doc """
  Accepts the category and topic from the params url map and
  renders it
  The params entries are availiable in html via @category, @topic
  """
  def show(conn, %{"category" => category, "topic" => topic}) do
    question = "Are you going to answer this question?"
    radios = [
      %{:value => "yes", :label => "Yes"},
      %{:value => "no", :label => "No"},
      %{:value => "none", :label => "None of your business"}
    ]
    conn
    |> assign(:category, category)
    |> assign(:topic, topic)
    |> assign(:question, question)
    |> assign(:radios, radios)
    |> render("index.html")
  end
end
