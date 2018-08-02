defmodule ContraWeb.ChatController do
  use ContraWeb, :controller

  alias Contra.Accounts
  @doc """
  Accepts the category, topic, and chat from the params url map and
  renders it
  The params entries are availiable in html via @category, @topic, @chat
  """
  # !!!!!!!!!
  # this section checks for authentication
  plug :check_auth

  defp check_auth(conn, _args) do
    if user_id = get_session(conn, :current_user_id) do
    current_user = Accounts.get_user!(user_id)

    conn
      |> assign(:current_user, current_user)
      # |> put_flash(:info, "this worked, i guess")
      # |> put_flash(:info, Accounts.get_user!(user_id))
    else
      conn
      # |> redirect("to: session_path(conn, :index)")
      # |> halt()
      |> put_flash(:info, "Login Failed")
      |> redirect(to: page_path(conn, :index))
    end
  end
#
# !!!!!!!!!!

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
