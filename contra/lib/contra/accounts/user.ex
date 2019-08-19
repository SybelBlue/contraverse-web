defmodule Contra.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Contra.Accounts.User
  # alias Comeonin.Bcrypt

  schema "users" do
    field :encrypted_password, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :encrypted_password])
    |> validate_required([:username, :encrypted_password])
    |> unique_constraint(:username)
    |> update_change(:encrypted_password, &Bcrypt.hash_pwd_salt/1)
    end
end
