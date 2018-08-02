defmodule ContraWeb.HomeController do
  use ContraWeb, :controller

  alias Contra.Accounts

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
  def index(conn, _params) do
    # mock data
    open_href = "/chat/test/open"
    closed_href = "/chat/test/closed"
    existing_convos = [
      %{:href => open_href, :text => "Existing Convo 1"},
      %{:href => open_href, :text => "Existing Convo 2"}
    ]
    old_convos = [
      %{:href => closed_href, :text => "Old Convo 1"},
      %{:href => closed_href, :text => "Old Convo 2"},
      %{:href => closed_href, :text => "Old Convo 3"},
      %{:href => closed_href, :text => "Old Convo 4"},
      %{:href => closed_href, :text => "Old Convo 5"},
      %{:href => closed_href, :text => "Old Convo 6"}
    ]
    # assign and render
    conn
    |> assign(:existing_convos, existing_convos)
    |> assign(:old_convos, old_convos)
    |> render("index.html")
  end
end
