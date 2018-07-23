import CommonFunctions from "./common_functions"

let ChatRoom = {
  init(socket) {
    let channel = this.join(socket);
    return channel;
  },

  join(socket) {
    socket.params.chatroomData = this.getRoomData()
    let params = socket.params
    let channelStr = params.category + ":" + params.chatroomData.id
    let channel = CommonFunctions.joinChannel(socket, channelStr, {})
    return channel
  },

  // returns object literal of room data ////////////TODO!!!!!!!!
  getRoomData() {
    let pathname = window.location.pathname
    let chat_id = pathname.substring(pathname.lastIndexOf('/') + 1)

    // returns object literal of room data, ////////////FIX!!!!!!!!
    return {
      id: chat_id,
      active: true
    }
  },
}

export default ChatRoom
