defmodule ContraWeb.ConvoSetupChannel do
  use Phoenix.Channel
  require Logger
  alias ContraWeb.Presence

  def join("convo-setup:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  def handle_info(:after_join, socket) do
    push socket, "presence_state", Presence.list(socket)
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:seconds))
    })
    {:noreply, socket}
  end
end
