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
    render conn, "index.html"
  end
end
