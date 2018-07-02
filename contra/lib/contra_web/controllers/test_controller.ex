#module for testing
#DO NOT LEAVE ANY IMPORTANT CODE IN HERE, THINGS ARE DESIGNED TO
#BE OVERWRITTEN IN THIS MODULE
defmodule ContraWeb.TestController do
  use ContraWeb, :controller

  def index(conn, _params) do
    # render conn, "index.html" #Default code
    conn
    |> put_flash(:info, "This is from flash info in test_controller")
    |> render("index.html")
  end

  def show(conn, %{"body" => body}) do
    render conn, "show.html", body: body
  end

  def jimmy(conn, %{"body" => val}) do
    # render conn, "index.html"
    conn
    |> put_flash(:error, "HERES JIMMY")
    |> render("show.html", body: val)
  end
end
