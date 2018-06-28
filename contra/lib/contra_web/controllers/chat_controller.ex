defmodule ContraWeb.ChatController do
  use ContraWeb, :controller

  @doc """
  Accepts the category, topic, and chat from the params url map and
  renders it
  The params entries are availiable in html via @category, @topic, @chat
  """
  def show(conn, %{"category" => category,
    "topic" => topic, "chat_id" => chat}) do
    conn
    |> assign(:category, category)
    |> assign(:topic, topic)
    |> assign(:chat, chat)
    |> render("index.html")
  end
end
