import {Socket/*, Presence*/} from "phoenix"

let ChatRoom = {
  init(socket) {
    this.join(socket)
  },

  join(socket) {
    let channelStr = '' //fix
    let channel = socket.channel(channelStr, {})
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  },
}

export default ChatRoom
