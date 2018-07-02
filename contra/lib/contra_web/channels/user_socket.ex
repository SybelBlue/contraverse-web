defmodule ContraWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "convo-setup:*", ContraWeb.ConvoSetupChannel

  # this is where all our categories will go, template:
  # channel "category:*", ContraWeb.ChatChannel
  #
  # note that chat_channel.ex must have a new join
  # method added to pattern match. See file for template
  channel "practice-arena:*", ContraWeb.ChatChannel
  channel "politics:*", ContraWeb.ChatChannel
  channel "ethics:*", ContraWeb.ChatChannel
  channel "philosophy:*", ContraWeb.ChatChannel
  channel "pop-culture:*", ContraWeb.ChatChannel
  channel "religion:*", ContraWeb.ChatChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(_params, socket) do
    {:ok, socket}
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     ContraWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
