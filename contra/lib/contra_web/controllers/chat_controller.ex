defmodule ContraWeb.ChatController do
  use ContraWeb, :controller

  @doc """
  Accepts the category, topic, and chat from the params url map and
  renders it
  The params entries are availiable in html via @category, @topic, @chat
  """
  def show(conn, %{"category" => category,
    "topic" => topic, "chat_id" => chat}) do
    # mock data
    open = (chat == :open)

    messages = [
      %{sent: true, text: "Hello, how are you?"},
      %{sent: false, text: "I'm good, thanks for asking. How are you doing?"},
      %{sent: true, text: "I am great. So can I ask what your reasoning was behind your answer to the prompt?"},
      %{sent: false, text: "I was about to ask you the same thing! Great minds truly do think alike."}
    ]
    responses = %{
      question: "Here is where the question will go.",
      yours: "Yes.",
      theirs: "No."
    }
    # assign and render
    conn
    |> assign(:category, category)
    |> assign(:topic, topic)
    |> assign(:chat_id, chat)
    |> assign(:open, open)
    |> assign(:messages, messages)
    |> assign(:responses, responses)
    |> render("index.html")
  end
end
