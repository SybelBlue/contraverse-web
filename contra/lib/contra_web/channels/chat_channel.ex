defmodule ContraWeb.ChatChannel do
  use Phoenix.Channel
  require Logger
  alias ContraWeb.Presence

  # template for adding new category
  #
  # def join("category:" <> room_id, _message, socket) do
  #   send(self(), :after_join)
  #   Logger.debug "Topic: category"
  #   Logger.debug "Room id: #{inspect(room_id)}"
  #   {:ok, socket}
  # end

  def join("practice-arena:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: practice-arena"
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  def join("politics:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: politics"
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  def join("ethics:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: ethics"
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  def join("philosophy:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: philosophy"
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  def join("pop-culture:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: pop-culture"
    Logger.debug "Room id: #{inspect(room_id)}"
    {:ok, socket}
  end

  def join("religion:" <> room_id, _message, socket) do
    send(self(), :after_join)
    Logger.debug "Topic: religion"
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
