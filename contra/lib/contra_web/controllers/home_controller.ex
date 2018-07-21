defmodule ContraWeb.HomeController do
  use ContraWeb, :controller

  alias Contra.Accounts

  plug :check_auth

  defp check_auth(conn, _args) do
    if user_id = get_session(conn, :current_user_id) do
    current_user = Accounts.get_user!(user_id)

    conn
      |> assign(:current_user, current_user)
      |> put_flash(:info, "this worked, i guess")
      # |> put_flash(:info, Accounts.get_user!(user_id))
    else
      conn
      |> redirect(to: session_path(conn, :index))
      |> halt()
    end
  end
  def index(conn, _params) do
    # mock data
    href = "/chat/test/test"
    existing_convos = [
      %{:href => href, :text => "Existing Convo 1"},
      %{:href => href, :text => "Existing Convo 2"}
    ]
    old_convos = [
      %{:href => href, :text => "Old Convo 1"},
      %{:href => href, :text => "Old Convo 2"},
      %{:href => href, :text => "Old Convo 3"},
      %{:href => href, :text => "Old Convo 4"},
      %{:href => href, :text => "Old Convo 5"},
      %{:href => href, :text => "Old Convo 6"}
    ]
    # assign and render
    conn
    |> assign(:existing_convos, existing_convos)
    |> assign(:old_convos, old_convos)
    |> render("index.html")
  end
end
