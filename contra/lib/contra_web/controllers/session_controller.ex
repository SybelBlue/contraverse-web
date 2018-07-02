defmodule ContraWeb.SessionController do
  use ContraWeb, :controller
  alias Contra.Accounts

  def new(conn, _params) do
    render(conn, "new.html")
  end

  def create(conn, %{"session" => auth_params}) do
    user = Accounts.get_by_username(auth_params["username"])

    case Comeonin.Bcrypt.check_pass(user, auth_params["password"]) do
      {:ok, user} ->
        conn
        |> put_session(:current_user_id, user.id)
        |> put_flash(:info, "Logged in")
        |> redirect(to: home_path(conn, :index))
      {:error, _} ->
        conn
        |> put_flash(:error, "There was an issue with your username or password.")
        |> render("new.html")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:current_user_id)
    |> put_flash(:info, "Logged Out")
    |> redirect(to: page_path(conn, :index))
  end
end
